import React from 'react'
import { useState } from 'react'
import UserSearchResult from './UserSearchResult';
import axios from 'axios';
import BACKEND_URL from '../backendURL';

const SearchComponent = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [canSendRequest, setCanSendRequest] = useState(true);

    const searchChange = (event) => {

        if (!canSendRequest) {
            return;
        }

        const query = document.getElementById('searchInput').value;

        if (query.length == 0) {
            setSearchResults([]);
            return;
        }
        
        setCanSendRequest(false);
        axios.post(BACKEND_URL+'/api/searchUser', {
            query: query
        })
        .then(res => {
            setCanSendRequest(true);
            if (res.data.status_code == 0) {
                setSearchResults(res.data.users);
                
            }
        })
        .catch(err => {
            setSearchResults([]);
            setCanSendRequest(true);
        })
    }

    return (
        <div>
            <div className='search-bar-container'>
                <input id='searchInput' onChange={searchChange} className='search-bar' placeholder='Enter a username here' autoComplete='off'></input>
            </div>            
            {
                searchResults.map(e => {
                    return <UserSearchResult key={e.username} username={e.username} firstName={e.firstName} lastName={e.lastName} bio={e.bio}/>
                })
            }

        </div>
    )
}

export default SearchComponent
