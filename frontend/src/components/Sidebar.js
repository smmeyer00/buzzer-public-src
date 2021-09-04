import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const logoutClick = () => {
        window.token = '';
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-option'><Link className='sidebar-option-link' to='/'><h1>Home</h1></Link></div>
            <div className='sidebar-option'><Link className='sidebar-option-link' to='/search'><h1>Search</h1></Link></div>            
            <div className='sidebar-option'><Link className='sidebar-option-link' to='/profile'><h1>Profile</h1></Link></div>
            <div className='sidebar-option'><Link className='sidebar-option-link' to='/login' onClick={logoutClick}><h1>Log Out</h1></Link></div>            
        </div>
    )
}

export default Sidebar
