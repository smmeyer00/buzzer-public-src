import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Aside from '../components/Aside';
import { useHistory } from 'react-router';

const FeedPage = () => {

    let history = useHistory();

    if (!window.token) {
        history.push('/login');
        window.location.reload();
    }

    return (
        <div className='root-grid-container'>
            <Sidebar/>
            <Feed/>
            <Aside/>
        </div>
    )
}

export default FeedPage
