import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';
import BACKEND_URL from '../backendURL';

const LoginForm = () => {

    const [usernameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const history = useHistory();


    const formSubmit = (event) => {
        // handle api requests via axios 
        event.preventDefault();

        const loginData = {username: document.getElementById('username').value, password: document.getElementById('password').value};

        axios.post(BACKEND_URL+'/api/login', loginData)
            .then((res) => {
                if (res.data.status_code == 0) {
                    window.token = res.data.token;
                    history.push('/');
                } else {
                    setUserNameError('Username or Password incorrect');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='login-form'>
            <form method='POST' onSubmit={formSubmit}>
                <input id='username' className='login-form-text-input' type='text' name='username' placeholder='Username' required></input>
                <div>
                    <p id='usernameErrorMsg' className='form-error-message'>{usernameError}</p>
                </div>
                
                <input id='password' className='login-form-text-input' type='password' name='password' placeholder='Password' required></input>
                <div>
                    <p id='passwordErrorMsg' className='form-error-message'>{passwordError}</p>
                </div>
                
                <br></br>
                <input className='login-btn' type='submit' value='Login'></input>
            </form>
            <div className='signup-link-container'>
                <Link className='signup-link' to='/signup'>Sign Up</Link>
            </div>        
        </div>
    )
}

export default LoginForm
