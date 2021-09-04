import React from 'react'
import defaultpfp from '../images/defaultpfp.png';
import BuzzCard from './BuzzCard';
import axios from 'axios';
import BACKEND_URL from '../backendURL';


const UserProfile = ({stateInfo, setStateInfo, reLoad, userId, username, firstName, lastName, bio, numFollowers, numFollowing, following, followsBack}) => {
        
    if (!stateInfo.loaded) {
        axios.post(BACKEND_URL+'/api/usersBuzzes', {
            token: window.token,
            username: username
        })
        .then(res => {
            if (res.data.status_code == 0) {
                setStateInfo({
                    loaded: true,
                    buzzes: res.data.buzzes
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const loadMoreClick = () => {
        if (stateInfo.buzzes.length == 0) {
            alert('not loaded yet');
        } else {
            const tstamp = stateInfo.buzzes[stateInfo.buzzes.length-1].timestamp;
            
            axios.post(BACKEND_URL+'/api/usersBuzzesFrom', {
                token: window.token,
                username: username,
                timestamp: tstamp
            })
            .then(res => {
                if (res.data.status_code == 0) {
                    setStateInfo({
                        loaded: stateInfo.loaded,
                        buzzes: stateInfo.buzzes.concat(res.data.buzzes)
                    })
                }
            })
            .catch(err => {
                alert('Error loading more buzzes');
            })
        }
    }

    const followButtonClick = () => {
        if (following) {
            // already follows user, so unfollow
            axios.post(BACKEND_URL+'/api/unfollow', {
                token: window.token,
                userToUnfollow: userId
            })
            .then(res => {
                if (res.data.status_code == 0) {
                    // success, change followingReal state
                    reLoad();
                }
            })

        } else {
            // does not follow user, so follow them
            axios.post(BACKEND_URL+'/api/follow', {
                token: window.token,
                userToFollow: userId
            })
            .then(res => {
                if (res.data.status_code == 0) {
                    reLoad();
                }
            })
        }
    }
    
    return (
        <div className='feed'>
            <div className='profile-container'>
                <div className='pfp-container'>
                    <img alt='' src={defaultpfp}></img>
                </div>
                <h1>{firstName + ' ' + lastName}</h1>
                <h2>{'@'+username}</h2>
                <p>{numFollowers + ' followers • ' + numFollowing + ' following'}</p>
                <div>
                    <button onClick={followButtonClick} className={following ? 'unfollow-btn' : 'follow-btn'}>{following ? 'Unfollow' : 'Follow'}</button>
                </div>
                {followsBack ? <span className='follows-you-span'>-Follows You-</span> : ''}
                <p className='user-profile-bio-text'>{bio}</p>
            </div>

            {
                // here we will display the users buzzes
                stateInfo.buzzes.map(e => {
                    return <BuzzCard key={e._id} buzzId={e._id} author={e.author} content={e.content} timestamp={e.timestamp} liked={e.liked} rebuzzed={e.rebuzzed} numLikes={e.likes} numRebuzzes={e.rebuzzes} rebuzzedBy={e.rebuzzedBy ? e.rebuzzedBy : false}/>
                })
            }

            <div className='load-more-button-container'>
                <button type='button' className='load-more-button' onClick={loadMoreClick}>Load More</button>
            </div>

        </div>
    )
}

export default UserProfile
