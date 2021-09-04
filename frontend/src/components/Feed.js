import React from 'react';
import '../styles.css';
import BuzzCard from './BuzzCard';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../backendURL';
import { useState } from 'react';
import BuzzPostForm from './BuzzPostForm';

const Feed = () => {

    const history = useHistory();

    const [placeHolder, setPlaceHolder] = useState(<BuzzCard author={'loading...'} content={'loading...'}/>)
    const [buzzes, setBuzzes] = useState([]);

    const reloadBuzzes = () => {
        axios.post(BACKEND_URL+'/api/feed', {token: window.token})
            .then(res => {
                if (res.data.status_code == 0) {
                    if (res.data.buzzes.length > 0) {
                        setBuzzes(res.data.buzzes.reverse());
                    } else {
                        setPlaceHolder(null);
                        setBuzzes([{_id: -1, content: 'Welcome to Buzzer! When you follow users, their buzzes and rebuzzes will show up here!', author: 'Buzzer', timestamp: -1, likes: 0, rebuzzes: 0, liked: false, rebuzzed: false}]);
                    }
                } else {
                    history.push('/login');
                    window.location.reload();
                }
            })
            .catch(err => {
                history.push('/login');
                window.location.reload();
            })
    }

    if (!window.token) {
        history.push('/login');
        window.location.reload();
    }

    if (buzzes.length == 0) {
        console.log('loading feed');
        axios.post(BACKEND_URL+'/api/feed', {token: window.token})
            .then((res) => {
                if (res.data.status_code == 0) {
                    if (res.data.buzzes.length > 0) {
                        setBuzzes(res.data.buzzes.reverse());
                        setPlaceHolder(null);
                    } else {
                        setBuzzes([{_id: -1, content: 'Welcome to Buzzer! When you follow users, their buzzes and rebuzzes will show up here!', author: 'Buzzer', timestamp: -1, likes: 0, rebuzzes: 0, liked: false, rebuzzed: false}]);
                        setPlaceHolder(null);
                    }
                } else {
                    history.push('/login');
                    window.location.reload();
                }
                
            })
            .catch((err) => {
                history.push('/login');
                window.location.reload();
            })
    }


    const loadMoreClick = (event) => {
        const tstamp = buzzes[buzzes.length-1].timestamp;

        axios.post(BACKEND_URL+'/api/feedFrom', {
            token: window.token,
            timestamp: tstamp
        })
        .then(res => {
            console.log(res.data);
            setBuzzes(buzzes.concat(res.data.buzzes.reverse()));
        })
        .catch(err => {
            alert('Error fetching more buzzes');
        })
    }


    return (
        <div className='feed'>
           
            <BuzzPostForm update={reloadBuzzes}/>

            { placeHolder }
            {
                buzzes.map(e => {
                    return <BuzzCard key={e._id} buzzId={e._id} author={e.author} content={e.content} timestamp={e.timestamp} liked={e.liked} rebuzzed={e.rebuzzed} numLikes={e.likes} numRebuzzes={e.rebuzzes} rebuzzedBy={e.rebuzzedBy ? e.rebuzzedBy : false}/>
                })
            }
            
            <div className='load-more-button-container'>
                <button type='button' className='load-more-button' onClick={loadMoreClick}>Load More</button>
            </div>

        </div>
    )
}

export default Feed
