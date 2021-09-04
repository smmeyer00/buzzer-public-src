const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

require('dotenv').config();

const {MongoClient} = require('mongodb');
const uri = process.env.MONGO_URI
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(uri, options);

const jwt = require('jsonwebtoken');

const {sha256} = require('js-sha256');
const salt = 'buzzersecretsalt';
const emailValidator = require('deep-email-validator');
const { ObjectId } = require('bson');
const validUsernameChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';


const generateToken = (username) => {
    return jwt.sign({username: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5 days'});
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch(err) {
        return false;
    }
};

const generateClient = () => {
    return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}


/**
 * @param {String} username 
 * @returns {Boolean}   valid or not
 */
const usernameValid = (username) => {

    if (typeof username != 'string') {
        return false;
    }

    let valid = 4 <= username.length <= 20;

    [...username].forEach(c => {
        if (!validUsernameChars.includes(c)) {
            valid = false;
            return false;
        }
    });
    return valid;
};

/**
 * @param {String} usr 
 * @returns {Boolean} available or not 
 */
 const  usernameAvailable = async (usr) => {
    const collection = await client.db("Buzzer").collection("Users");
    const result = await collection.findOne({username: usr});

    return !result;
};

/**
 * @param {String} email 
 * @returns {Boolean} valid or not 
 */
const emailValid = async (email) => {
    if (typeof email != 'string') {
        return false;
    }
    const temp = await emailValidator.validate(email);
    return temp.valid;

};

/**
 * @param {String} eml 
 * @returns {Boolean} available or not 
 */
const emailAvailable = async (eml) => {
    const collection = await client.db("Buzzer").collection("Users");
    const result = await collection.findOne({email: eml});

    if (result) {
        return false;
    } else {
        return true;
    }
};

/**
 * @param   {Number}    bday    Unix time stamp
 * @returns {boolean}   Birthdate valid or not
 */
const birthdateValid = (bday) => {
    return ((Date.now()/1000) - bday >= 567648000);
};

/**
 * @param {Number} id 
 * @returns {Boolean} valid or not 
 */
const pfp_idValid = (id) => {
    if (!id) {
        return false;
    }
    return 1 <= Number(id) <= 6;
};

/**
 * @param {String} g 
 * @returns {Boolean} valid or not 
 */
const genderValid = (g) => {
    return ['M', 'F', 'O', 'N/A'].includes(g);
}

/**
 * @param {String} pwd 
 * @returns {Boolean} valid or not 
 */
const pwdValid = (pwd) => {
    return ((typeof pwd == 'string') && (8 <= pwd.length <= 20));
}

/**
 * 
 * @param {String} n name to be validated
 * @returns {Boolean} valid or not 
 */
const nameValid = (n) => {
    return ((typeof n == 'string') && 0 < n.length <= 20);
};

/**
 * 
 * @param {String} bio bio to be validated
 * @return {Boolean} valid or not 
 */
const bioValid = (bio) => {
    return ((typeof bio == 'string') && 0 < bio.length <= 20);
};

/**
 * @param {String} u username
 * @param {String} p password
 * @returns  returns false if failed or user id if successful
 */
const authenticate = async (u, p) => {
    const collection = await client.db("Buzzer").collection("Users");
    const result = await collection.findOne({username: u});

    if (result) {
        if (sha256(p + salt) == result.pwd_hash) {
            return result._id;
        } 
        return false;
    } else {
        return false;
    }
}

const userIdFromToken = async (token) => {
    const d = verifyToken(token);
    if (d) {        
        const collection = await client.db("Buzzer").collection("Users");
        const result = await collection.findOne({username: d.username});

        if (result) {
            return result._id;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

app.use(express.static(path.join(__dirname, 'react_build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'react_build', 'index.html'));
})


/**
 * Handles '/api/login' POST request
 */
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if ( usernameValid(username) && pwdValid(password) && await authenticate(username, password)) {
        const token = generateToken(username);
        res.json({ token: token, status_code: 0 });
        return;
    } else {
        res.json({ status_code: -1 });
        return;
    }
})

/**
 * Handles '/api/signup' POST request
 */
app.post('/api/signup', async (req, res) => {
    if (    usernameValid(req.body.username) &&
            await usernameAvailable(req.body.username) &&
            await emailValid(req.body.email) &&
            await emailAvailable(req.body.email) &&
            birthdateValid(Number(req.body.birthdate)) &&
            pfp_idValid(Number(req.body.pfp_id)) &&
            genderValid(req.body.gender) &&
            nameValid(req.body.firstName) &&
            nameValid(req.body.lastName) &&
            bioValid(req.body.bio) &&
            pwdValid(req.body.password)    ) {

        // create new account
        const accInfo = {
            username: req.body.username,
            pwd_hash: sha256(req.body.password + salt),
            token: sha256(req.body.password + req.body.username),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            pfp_id: parseInt(req.body.pfp_id),
            email: req.body.email,
            gender: req.body.gender,
            birthdate: parseInt(req.body.birthdate),
            liked_buzzes: [],
            rebuzzes: [],
            followers: [],
            following: [],
            login_history: [
                {
                    device: req.headers['user-agent'],
                    location: req.ip,
                    timestamp: parseInt(Date.now()/1000)
                }
            ]
        };

        const collection = await client.db("Buzzer").collection("Users");
        const result = await collection.insertOne(accInfo);

        if (result) {
            res.json({token: generateToken(req.body.username), status_code: 0});
            return;
        } else {
            res.json({ status_code: -1 });
            return;
        }

    } else {

        res.json({status_code: -1});
        return;
    }
});

/**
 * Handles '/api/postBuzz' POST request
 */
app.post('/api/postBuzz', async (req, res) => {
    const token = req.body.token;
    const content = req.body.content;

    if (!(typeof content == 'string' && content.length <= 240 && content.length > 0)) {
        // not valid
        res.json({status_code: -1});
        return;
    }

    const user_id = await userIdFromToken(token);

    if (user_id) {        
        const collection = await client.db("Buzzer").collection("Buzzes");
        
        const buzzPostResult = await collection.insertOne({
            content: content,
            author: user_id,
            timestamp: parseInt(Date.now()/1000),
            likes: [],
            rebuzzes: []
        });

        if (buzzPostResult) {
            res.json({status_code: 0});
        } else {
            res.json({status_code: -1});
        }
    } else {
        res.json({status_code: -1});
    }
});

/**
 * Handles '/api/likeBuzz' POST request
 */
app.post('/api/likeBuzz', async (req, res) => {
    const {token, buzz_id} = req.body;
    let user_id = await userIdFromToken(token);

    if (user_id) {        
        const usersCollection = await client.db("Buzzer").collection("Users");
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const buzzExists = await buzzesCollection.findOne({_id: ObjectId(buzz_id)});

        if (buzzExists && !buzzExists.likes.map(String).includes(String(user_id))) {
            // buzz exists and user has not already liked it
            const userUpdateResult = await usersCollection.updateOne({_id: ObjectId(user_id)}, {$push: {liked_buzzes: buzzExists._id}});
            const buzzUpdateResult = await buzzesCollection.updateOne({_id: ObjectId(buzzExists._id)}, {$push: {likes: user_id}});

            (buzzUpdateResult && userUpdateResult) ? res.json({status_code: 0}) : res.json({status_code: -1});
        } else {
            res.json({status_code: -1});
        }
    } else {
        res.json({status_code: -1});
    }
    
});

/**
 * Handles '/api/unlikebuzz' POST request
 */
app.post('/api/unlikeBuzz', async (req, res) => {
    const {token, buzz_id} = req.body;
    let user_id = await userIdFromToken(token);

    if (user_id) {        
        const usersCollection = await client.db("Buzzer").collection("Users");
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const buzzExists = await buzzesCollection.findOne({_id: ObjectId(buzz_id)});

        if (buzzExists && buzzExists.likes.map(String).includes(String(user_id))) {
            // buzz exists and user has already liked it
            const userUpdateResult = await usersCollection.updateOne({_id: ObjectId(user_id)}, {$pull: {liked_buzzes: buzzExists._id}});
            const buzzUpdateResult = await buzzesCollection.updateOne({_id: ObjectId(buzzExists._id)}, {$pull: {likes: user_id}});

            (buzzUpdateResult && userUpdateResult) ? res.json({status_code: 0}) : res.json({status_code: -1});
        } else {
            res.json({status_code: -1});
        }
    } else {
        res.json({status_code: -1});
    }
});

/**
 * Handles '/api/rebuzzBuzz' POST request
 */
app.post('/api/rebuzzBuzz', async (req, res) => {
    const {token, buzz_id} = req.body;
    let user_id = await userIdFromToken(token);

    if (user_id) {
        const usersCollection = await client.db("Buzzer").collection("Users");
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const buzzExists = await buzzesCollection.findOne({_id: ObjectId(buzz_id)});

        if (buzzExists && !buzzExists.rebuzzes.map(String).includes(String(user_id))) {
            // buzz exists and user has not already liked it
            const userUpdateResult = await usersCollection.updateOne({_id: ObjectId(user_id)}, {$push: {rebuzzes: buzzExists._id}});
            const buzzUpdateResult = await buzzesCollection.updateOne({_id: ObjectId(buzzExists._id)}, {$push: {rebuzzes: user_id}});

            (buzzUpdateResult && userUpdateResult) ? res.json({status_code: 0}) : res.json({status_code: -1});
        } else {
            res.json({status_code: -1});
        }
    } else {
        res.json({status_code: -1});
    }
});

/**
 * Handles '/api/unrebuzzBuzz' POST request
 */
app.post('/api/unrebuzzBuzz', async (req, res) => {
    const {token, buzz_id} = req.body;
    let user_id = await userIdFromToken(token);

    if (user_id) {
        const usersCollection = await client.db("Buzzer").collection("Users");
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const buzzExists = await buzzesCollection.findOne({_id: ObjectId(buzz_id)});

        if (buzzExists && buzzExists.rebuzzes.map(String).includes(String(user_id))) {
            // buzz exists and user has already liked it
            const userUpdateResult = await usersCollection.updateOne({_id: ObjectId(user_id)}, {$pull: {rebuzzes: buzzExists._id}});
            const buzzUpdateResult = await buzzesCollection.updateOne({_id: ObjectId(buzzExists._id)}, {$pull: {rebuzzes: user_id}});

            (buzzUpdateResult && userUpdateResult) ? res.json({status_code: 0}) : res.json({status_code: -1});
        } else {
            res.json({status_code: -1});
        }
    } else {
        res.json({status_code: -1});
    }
});

/**
 * Handles '/api/follow' POST request
 */
app.post('/api/follow', async (req, res) => {
    const {token, userToFollow} = req.body;
    let user_id = await userIdFromToken(token);

    if (user_id) {
        if (String(user_id) == userToFollow) {
            res.json({status_code: -1});
            return;
        }

        const usersCollection = await client.db("Buzzer").collection("Users");
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const userToFollowResult = await usersCollection.findOne({_id: ObjectId(userToFollow)});

        if (userToFollowResult && !userToFollowResult.followers.map(String).includes(String(user_id))) {
            // userToFollow exists and user does not already follow them 
            const userToFollowUpdateResult = await usersCollection.updateOne({_id: ObjectId(userToFollow)}, {$push: {followers: user_id}});
            const userUpdateResult = await usersCollection.updateOne({_id: ObjectId(user_id)}, {$push: {following: userToFollowResult._id}});     

            (userToFollowUpdateResult && userUpdateResult) ? res.json({status_code: 0}) : res.json({status_code: -1});
        } else {
            res.json({status_code: -1});
        }
    } else {
        res.json({status_code: -1});
    }
});

/**
 * Handles '/api/unfollow' POST request
 */
app.post('/api/unfollow', async (req, res) => {
    const {token, userToUnfollow} = req.body;
    let user_id = await userIdFromToken(token);

    if (user_id) {
        const usersCollection = await client.db("Buzzer").collection("Users");
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const userToUnfollowResult = await usersCollection.findOne({_id: ObjectId(userToUnfollow)});

        if (userToUnfollowResult && userToUnfollowResult.followers.map(String).includes(String(user_id))) {
            // userToUnfollow exists and user follows them
            const userToUnfollowUpdateResult = await usersCollection.updateOne({_id: ObjectId(userToUnfollow)}, {$pull: {followers: user_id}});
            const userUpdateResult = await usersCollection.updateOne({_id: ObjectId(user_id)}, {$pull: {following: userToUnfollowResult._id}});     

            (userToUnfollowUpdateResult && userUpdateResult) ? res.json({status_code: 0}) : res.json({status_code: -1});
        } else {
            res.json({status_code: -1});
        }
    } else {
        res.json({status_code: -1});
    }
});

// NEEDS TESTING
/**
 * Handles '/api/deleteBuzz' POST request
 */
app.post('/api/deleteBuzz', async (req, res) => {
    const {token, buzz_id} = req.body;
    let user_id = await userIdFromToken(token);

    if (user_id) {
        const usersCollection = await client.db("Buzzer").collection("Users");
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");

        const userResult = await usersCollection.findOne({_id: ObjectId(user_id)});
        const buzzResult = await buzzesCollection.findOne({_id: ObjectId(buzz_id)});

        if (buzzResult && String(buzzResult.author) == String(user_id)) {
            // user is author of buzz, permission to delete: true
            const delResult = await buzzesCollection.deleteOne({_id: ObjectId(buzz_id)});

            if (delResult) {
                res.json({status_code: 0});
                return;
            }
            res.json({status_code: -1});
            return;
        }
        res.json({status_code: -1});
        return;
    }
    res.json({status_code: -1});
    return;
});

/**
 * Handles '/api/updateAccount' POST request
 */
app.post('/api/updateAccount', async (req, res) => {
    const {token, newPfp_id, newEmail, newGender, newBirthdate, newBio, newLastName, newFirstName} = req.body;
    const valid = await pfp_idValid(newPfp_id) && await emailValid(newEmail) && await genderValid(newGender) && await birthdateValid(newBirthdate) && await bioValid(newBio) && await nameValid(newFirstName) && await nameValid(newLastName);
    
    let user_id = await userIdFromToken(token);

    if (user_id) {
        // all data submitted okay, proceed with deletion
        const usersCollection = await client.db("Buzzer").collection("Users");
        const userResult = await usersCollection.updateOne({_id: ObjectId(user_id)}, {$set: {pfp_id: parseInt(newPfp_id), email: newEmail, gender: newGender, birthdate: parseInt(newBirthdate), bio: newBio, firstName: newFirstName, lastName: newLastName}});
        
        userResult ? res.json({status_code: 0}) : res.json({status_code: -1});
        return;
    }
    res.json({status_code: -1})
    return;
});

/**
 * Handles '/api/feed' POST request
 */
app.post('/api/feed', async (req, res) => {
    const {token} = req.body;
    const user_id = await userIdFromToken(token);

    if (user_id) {
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const usersCollection = await client.db("Buzzer").collection("Users");
        
        const userResult = await usersCollection.findOne({_id: user_id});
        const findBuzzesFrom = userResult.following

        findBuzzesFrom.push(user_id); // arr of user ObjectId who we need to find buzzes from
        let findBuzzes = userResult.rebuzzes; // arr of buzz ObjectId who we need to find

        // start of list of buzzes that will be sent back in response

        const usersToGetRebuzzesFrom = await usersCollection.find({ _id: { $in: findBuzzesFrom } }).toArray();

        usersToGetRebuzzesFrom.forEach(u => {
            findBuzzes = findBuzzes.concat(u.rebuzzes);
        });

        // const rebuzzes = await buzzesCollection.find({ _id: { $in: findBuzzes } }).sort({timestamp: -1}).limit(100).toArray();

        const buzzes = await buzzesCollection.find({$or: [ {author: { $in: findBuzzesFrom }}, {_id: {$in: findBuzzes}} ] }).sort({timestamp: -1}).limit(100).toArray();

        // now we have two arrays: buzzes, and rebuzzes which both must appear in feed.
        // structure will be modified before sent back to client, likes and rebuzzes will be a count
        // rather than an array, and there will be a rebuzzedBy field if it should show in feed as a 
        // rebuzz

        /**
         * structure of buzz getting sent to client:
         * {
         *      _id: String(ObjectId),
         *      content: String[1-240],
         *      author: String, username of who posted
         *      timestamp: int, // unix epoch timestamp
         *      likes: int, // count of likes
         *      rebuzzes: int, // count of likes
         *      liked: boolean, // whether user has liked tweet or not 
         *      rebuzzed: boolean, // whether user has rebuzzed tweet or not 
         *      rebuzzedBy: String, // username of person who rebuzzed it. not present if not rebuzzed
         * }
         */

        let finalBuzzesArray = [];
        let followingIdStrings = userResult.following.map(e => String(e));
        let markedAsRebuzzed = []; // arr of buzz ObjectId that were marked as rebuzzed, so we dont remark buzzes

        for (const e of buzzes) {

            let authorResult = await usersCollection.findOne({_id: e.author}, {projection: {username: 1}})

            let rebuzzerUsername = false;

            for (const oId of e.rebuzzes) {
                if (followingIdStrings.includes(String(oId)) && !markedAsRebuzzed.includes(String(e._id))) {
                    let temp = await usersCollection.findOne({_id: oId}, {projection: {username: 1}});
                    rebuzzerUsername = temp.username;
                    break;
                }
            }

            finalBuzzesArray.push({
                _id: String(e._id),
                content: e.content,
                author: authorResult.username,
                timestamp: e.timestamp,
                likes: e.likes.length,
                rebuzzes: e.rebuzzes.length,
                liked: e.likes.map(e => String(e)).includes(String(user_id)),
                rebuzzed: e.rebuzzes.map(e => String(e)).includes(String(user_id)),
                rebuzzedBy: rebuzzerUsername 
            });
        }

        finalBuzzesArray.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            return 1;
        });
        res.json({ status_code: 0, buzzes: finalBuzzesArray })
        return;
        
    }
    res.json({ status_code: -1 })
    return;
});

/**
 * Handles '/api/feedFrom POST request
 * Very similar to feed API call but only returns buzzes before a provided time
 */
app.post('/api/feedFrom', async (req, res) => {
    const {token, timestamp} = req.body;
    const user_id = await userIdFromToken(token);

    if (user_id) {
        const buzzesCollection = await client.db("Buzzer").collection("Buzzes");
        const usersCollection = await client.db("Buzzer").collection("Users");
        
        const userResult = await usersCollection.findOne({_id: user_id});
        const findBuzzesFrom = userResult.following

        findBuzzesFrom.push(user_id); // arr of user ObjectId who we need to find buzzes from
        let findBuzzes = userResult.rebuzzes; // arr of buzz ObjectId who we need to find

        // start of list of buzzes that will be sent back in response

        const usersToGetRebuzzesFrom = await usersCollection.find({ _id: { $in: findBuzzesFrom } }).toArray();

        usersToGetRebuzzesFrom.forEach(u => {
            findBuzzes = findBuzzes.concat(u.rebuzzes);
        });

        const buzzes = await buzzesCollection.find({$or: [ {author: { $in: findBuzzesFrom }}, {_id: {$in: findBuzzes}} ], timestamp: {$lt: timestamp} }).sort({timestamp: -1}).limit(100).toArray();


        // now we have two arrays: buzzes, and rebuzzes which both must appear in feed.
        // structure will be modified before sent back to client, likes and rebuzzes will be a count
        // rather than an array, and there will be a rebuzzedBy field if it should show in feed as a 
        // rebuzz

        /**
         * structure of buzz getting sent to client:
         * {
         *      _id: String(ObjectId),
         *      content: String[1-240],
         *      author: String, username of who posted
         *      timestamp: int, // unix epoch timestamp
         *      likes: int, // count of likes
         *      rebuzzes: int, // count of likes
         *      liked: boolean, // whether user has liked tweet or not 
         *      rebuzzed: boolean, // whether user has rebuzzed tweet or not 
         *      rebuzzedBy: String, // username of person who rebuzzed it. not present if not rebuzzed
         * }
         */

        let finalBuzzesArray = [];
        let followingIdStrings = userResult.following.map(e => String(e));
        let markedAsRebuzzed = []; // arr of buzz ObjectId that were marked as rebuzzed, so we dont remark buzzes

        for (const e of buzzes) {

            let authorResult = await usersCollection.findOne({_id: e.author}, {projection: {username: 1}})

            let rebuzzerUsername = false;

            for (const oId of e.rebuzzes) {
                if (followingIdStrings.includes(String(oId)) && !markedAsRebuzzed.includes(String(e._id))) {
                    let temp = await usersCollection.findOne({_id: oId}, {projection: {username: 1}});
                    rebuzzerUsername = temp.username;
                    break;
                }
            }

            finalBuzzesArray.push({
                _id: String(e._id),
                content: e.content,
                author: authorResult.username,
                timestamp: e.timestamp,
                likes: e.likes.length,
                rebuzzes: e.rebuzzes.length,
                liked: e.likes.map(e => String(e)).includes(String(user_id)),
                rebuzzed: e.rebuzzes.map(e => String(e)).includes(String(user_id)),
                rebuzzedBy: rebuzzerUsername 
            });
        }

        finalBuzzesArray.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            return 1;
        });
        res.json({ status_code: 0, buzzes: finalBuzzesArray })
        return;
        
    }
    res.json({ status_code: -1 })
    return;
})

/**
 * Handles '/api/usersBuzzes' POST request
 */
app.post('/api/usersBuzzes', async (req, res) => {
    const {token, username} = req.body;

    const user_id = await userIdFromToken(token);

    if (!user_id) {
        res.json({status_code: -1});
        return;
    }

    try {
        const usersCollection = await client.db('Buzzer').collection('Users');
        const buzzesCollection = await client.db('Buzzer').collection('Buzzes');

        const userResult = await usersCollection.findOne({username: username});

        if (!userResult) {
            res.json({status_code: -1});
            return; // invalid username
        }

        const buzzesResult = await buzzesCollection.find({$or: [{author: userResult._id}, {_id: {$in: userResult.rebuzzes}}]}).sort({timestamp: -1}).limit(100).toArray();

        let finalBuzzesArray = [];

        for (const e of buzzesResult) {

            const authorResult = await usersCollection.findOne({_id: e.author}, {projection: {username: 1}});

            finalBuzzesArray.push({
                _id: String(e._id),
                content: e.content,
                author: authorResult.username,
                timestamp: e.timestamp,
                likes: e.likes.length,
                rebuzzes: e.rebuzzes.length,
                liked: e.likes.map(e => String(e)).includes(String(user_id)),
                rebuzzed: e.rebuzzes.map(e => String(e)).includes(String(user_id)),
                rebuzzedBy: username == authorResult.username ? false : username
            })
        }
        res.json({status_code: 0, buzzes: finalBuzzesArray});
        return;

    } catch (e) {
        res.json({status_code: -1});
        return;
    }
})

/**
 * Handles '/api/usersBuzzesFrom' POST request
 * Similar to usersBuzzes API call but only returns buzzes before a provided time
 */
app.post('/api/usersBuzzesFrom', async (req, res) => {
    const {token, username, timestamp} = req.body;

    const user_id = await userIdFromToken(token);

    if (!user_id || typeof timestamp != 'number') {
        res.json({status_code: -1});
        return;
    }


    try {
        const usersCollection = await client.db('Buzzer').collection('Users');
        const buzzesCollection = await client.db('Buzzer').collection('Buzzes');

        const userResult = await usersCollection.findOne({username: username});

        if (!userResult) {
            res.json({status_code: -1});
            return; // invalid username
        }

        const buzzesResult = await buzzesCollection.find({$or: [{author: userResult._id}, {_id: {$in: userResult.rebuzzes}}], timestamp: {$lt: timestamp}}).sort({timestamp: -1}).limit(100).toArray();

        let finalBuzzesArray = [];

        for (const e of buzzesResult) {

            const authorResult = await usersCollection.findOne({_id: e.author}, {projection: {username: 1}});

            finalBuzzesArray.push({
                _id: String(e._id),
                content: e.content,
                author: authorResult.username,
                timestamp: e.timestamp,
                likes: e.likes.length,
                rebuzzes: e.rebuzzes.length,
                liked: e.likes.map(e => String(e)).includes(String(user_id)),
                rebuzzed: e.rebuzzes.map(e => String(e)).includes(String(user_id)),
                rebuzzedBy: username == authorResult.username ? false : username
            })
        }
        res.json({status_code: 0, buzzes: finalBuzzesArray});
        return;

    } catch (e) {
        res.json({status_code: -1});
        return;
    }
})

/**
 * Handles '/api/user' POST request
 * Returns info needed for user page (user profile info and buzzes);
 */
app.post('/api/user', async (req, res) => {
    const {token, username} = req.body;

    if (typeof username != 'string') {
        res.json({status_code: -1});
        return;
    }

    const user_id = await userIdFromToken(token);

    if (user_id) {

        const usersCollection = await client.db('Buzzer').collection('Users');

        const result = await usersCollection.findOne({username: username})

        // following is whether the user making the request follows 'username'
        // followsBack is whether 'username' follows the user making the request
        const userData = {
            userId: String(result._id),
            username: result.username,
            firstName: result.firstName,
            lastName: result.lastName,
            bio: result.bio,
            numFollowers: result.followers.length,
            numFollowing: result.following.length,
            following: result.followers.map(String).includes(String(user_id)) ? true : false,
            followsBack: result.following.map(String).includes(String(user_id)) ? true : false 
        }

        res.json({status_code: 0, userData: userData});
        return;

    }
    res.json({status_code: -1});
    return;
})

/**
 * Handles '/api/changeUsername' POST request
 */
app.post('/api/changeUsername', async (req, res) => {
    // probably wont allow this due to token conflicts, would have to revoke all active tokens from previous
    // username since username is the identifier in the token 
    res.json({status_code: -1});
});

/**
 * Handles '/api/changeUsername' POST request
 * Handles search autocompleting for search page of application
 */
app.post('/api/searchUser', async (req, res) => {
    const { query } = req.body;

    if (typeof query != 'string') {
        res.json({status_code: -1});
        console.log('query not string');
        return;
    }

    
    try {
        const userCollection = client.db('Buzzer').collection('Users');
        let result = await userCollection.aggregate([
            {
                "$search": {
                    "index": "usernameAutocomplete",
                    "autocomplete": {
                        "query": `${query}`,
                        "path": "username",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 1
                        }
                    }
                }
            }
        ]).toArray();

        // only send necessary information to client
        result = result.map(e => {
            return {
                username: e.username,
                firstName: e.firstName,
                lastName: e.lastName,
                bio: e.bio
            }
        })

        res.json({status_code: 0, users: result})
        return;
    } catch (e) {
        res.json({status_code: -1});
        return;
    }

    
})

/**
 * Handles '/api/profile' POST request
 * Returns user info of user making request, so they can see their account details
 */
app.post('/api/profile', async (req, res) => {
    const { token } = req.body;

    const user_id = await userIdFromToken(token);

    if (!user_id) {
        res.json({status_code: -1});
        return;
    }

    try {
        const userCollection = await client.db('Buzzer').collection('Users');
        const result = await userCollection.findOne({_id: user_id});

        const resData = {
            userId: String(result._id),
            username: result.username,
            firstName: result.firstName,
            lastName: result.lastName,
            bio: result.bio,
            email: result.email,
            gender: result.gender,
            birthdate: result.birthdate,
            numFollowers: result.followers.length,
            numFollowing: result.following.length,
            following: false,
            followsBack: false
        }

        res.json({status_code: 0, profileData: resData});
        return;

    } catch (e) {
        res.json({status_code: -1});
        return;
    }




}) 

/**
 * Connects to mongodb database
 * @returns {Boolean} whether connection was successul or not
 */
const connectDB = async () => {
    try {
        await client.connect();
        console.log('connected');
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}


app.listen(process.env.PORT || 5000, () => {
    connectDB()
    .then((connected) => {
        if (connected) {
            console.log(`App listening on ${process.env.PORT || 5000}`)
        } else {
            console.log('failed to connect to db');
            process.exit(-1);
        }
    })
    .catch((err) => {
        console.log(err);
        process.exit(-1);
    });
});
