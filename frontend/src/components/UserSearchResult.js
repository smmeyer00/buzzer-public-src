import React from 'react'
import { useHistory } from 'react-router'
import defaultpfp from '../images/defaultpfp.png';

const UserSearchResult = ({username, firstName, lastName, bio}) => {

    let history = useHistory();

    const clickHandler = () => {
        history.push('/user/' + username);
    }

    return (
        <div className='user-search-result-container'>
            <div className='user-search-result' onClick={clickHandler}>
                <div className='user-search-result-top-left'>
                    <p className='user-search-result-name-text'>{firstName + ' ' + lastName}</p>
                    <p>{'@'+username}</p>
                </div>
                <div className='user-search-result-bottom-right'>
                    {bio}
                </div>
                <div className='user-search-result-bottom-left'>
                    <img alt='' src={defaultpfp}></img>
                </div>
            </div>
        </div>
    )
}

export default UserSearchResult
