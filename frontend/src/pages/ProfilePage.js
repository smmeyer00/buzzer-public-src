import React from 'react'
import { useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../backendURL';
import Sidebar from '../components/Sidebar';
import Aside from '../components/Aside';
import UserProfile from '../components/UserProfile';


const ProfilePage = () => {
    let history = useHistory();

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
        
        axios.post(BACKEND_URL+'/api/profile', {
            token: window.token,
        })
        .then(res => {
            setUserProfileInfo({
                loaded: true,
                userId: res.data.profileData.userId,
                username: res.data.profileData.username,
                firstName: res.data.profileData.firstName,
                lastName: res.data.profileData.lastName,
                bio: res.data.profileData.bio,
                numFollowers: res.data.profileData.numFollowers,
                numFollowing: res.data.profileData.numFollowing,
                following: res.data.profileData.following,
                followsBack: res.data.profileData.followsBack
            })
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    return (
        <div className='root-grid-container'>
            <Sidebar/>
            <UserProfile stateInfo={stateInfo} setStateInfo={setStateInfo} username={userProfileInfo.username} firstName={userProfileInfo.firstName} lastName={userProfileInfo.lastName} bio={userProfileInfo.bio} numFollowers={userProfileInfo.numFollowers} numFollowing={userProfileInfo.numFollowing} following={userProfileInfo.following} followsBack={userProfileInfo.followsBack}/>
            <Aside/>
        </div>
    )
}

export default ProfilePage
