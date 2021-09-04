import React from 'react'
import Sidebar from '../components/Sidebar'
import SearchComponent from '../components/SearchComponent'
import Aside from '../components/Aside'
import { useHistory } from 'react-router'

const SearchPage = () => {

    let history = useHistory();

    if (!window.token) {
        history.push('/login');
        window.location.reload();
    }

    return (
        <div className='root-grid-container'>
            <Sidebar/>
            <SearchComponent/>
            <Aside/>
        </div>
    )
}

export default SearchPage
