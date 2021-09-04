import React from 'react'
import { useParams } from 'react-router';
import Sidebar from '../components/Sidebar';
import Aside from '../components/Aside';
import UserProfile from '../components/UserProfile';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import BACKEND_URL from '../backendURL';

const UserPage = () => {

    let history = useHistory();
    const { username } = useParams();

    const [oldParam, setOldParam] = useState(username);

    const [stateInfo, setStateInfo] = useState({
        loaded: false,
        buzzes: []
    });
    
    const [userProfileInfo, setUserProfileInfo] = useState({
        loaded: false,
        username: 'loading...', 
        firstName: 'loading...', 
        lastName: 'loading...', 
        bio: 'loading...', 
        numFollowers:'', 
        numFollowing:'', 
        following: false, 
        followsBack: false
    })
    
    if (!window.token) {
        history.push('/login');
        window.location.reload();
    }

    if (!userProfileInfo.loaded) {
        
        axios.post(BACKEND_URL+'/api/user', {
            token: window.token,
            username: username
        })
        .then(res => {
            setUserProfileInfo({
                loaded: true,
                userId: res.data.userData.userId,
                username: res.data.userData.username,
                firstName: res.data.userData.firstName,
                lastName: res.data.userData.lastName,
                bio: res.data.userData.bio,
                numFollowers: res.data.userData.numFollowers,
                numFollowing: res.data.userData.numFollowing,
                following: res.data.userData.following,
                followsBack: res.data.userData.followsBack
            })
        })
        .catch(err => {
            console.log(err);
        })
        
    }
    
    const reLoadUser = () => {
        setUserProfileInfo({
            loaded: false,
            username: 'loading...', 
            firstName: 'loading...', 
            lastName: 'loading...', 
            bio: 'loading...', 
            numFollowers:'', 
            numFollowing:'', 
            following: false, 
            followsBack: false
        })
    }
    
    if (username != oldParam) {
        setOldParam(username);
        reLoadUser();
        setStateInfo({
            loaded: false,
            buzzes: []
        })
    }  

    return (
        <div className='root-grid-container'>
            <Sidebar/>
            <UserProfile reLoad={reLoadUser} stateInfo={stateInfo} setStateInfo={setStateInfo} userId={userProfileInfo.userId} username={userProfileInfo.username} firstName={userProfileInfo.firstName} lastName={userProfileInfo.lastName} bio={userProfileInfo.bio} numFollowers={userProfileInfo.numFollowers} numFollowing={userProfileInfo.numFollowing} following={userProfileInfo.following} followsBack={userProfileInfo.followsBack}/>
            <Aside/>
        </div>
    )
}

export default UserPage
