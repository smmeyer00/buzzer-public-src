import React, { useState } from 'react'
import BACKEND_URL from '../backendURL';
import { Link, useHistory } from 'react-router-dom';
const axios = require('axios').default;

const validate = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// email, firstName, lastName, username, password, passwordConfirm, bio, gender, birthdate
const SignupForm = () => {

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');    
    const [emailError, setEmailError] = useState('');    
    const [usernameError, setUsernameError] = useState('');    
    const [passwordError, setPasswordError] = useState('');    
    const [confirmPasswordError, setConfirmPasswordError] = useState(''); 
    const [dateError, setDateError] = useState('');

    const history = useHistory();

    const formSubmit = (event) => {
        // make api request(s) via axios 
        event.preventDefault();

        if (firstNameError || lastNameError || emailError || usernameError || passwordError || confirmPasswordError || dateError) {
            console.log('cannot submit with errors');
            return;
        }
    
        const data = {
            username: document.getElementById('usernameInput').value,
            password: document.getElementById('passwordInput').value,
            firstName: document.getElementById('firstNameInput').value,
            lastName: document.getElementById('lastNameInput').value,
            bio: document.getElementById('bioInput').value,
            pfp_id: 1,
            email: document.getElementById('emailInput').value,
            gender: document.getElementById('genderInput').value,
            birthdate: Date.parse(document.getElementById('birthdateInput').value)/1000
        }

    
        axios.post(BACKEND_URL+'/api/signup', data)
        .then((res) => {
            if (res.data.status_code == 0) {
                window.token = res.data.token;
                history.push('/');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    
    };


    const emailChange = (event) => {
        if (event.target.value === '') {
            setEmailError('');
            return;
        }
        if (!validate(event.target.value)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const usernameChange = (event) => {
        if (event.target.value === '') {
            setUsernameError('');
            return;
        }

        if (event.target.value.length < 4) {
            setUsernameError('Username not long enough');
            return;
        } 

        if (event.target.value.search(/^[a-zA-Z0-9-_]+$/) === -1) {
            setUsernameError('Letters, numbers, and _ only');
            return;
        }

        setUsernameError('');
    };

    const confirmPasswordChange = (event) => {
        if (event.target.value !== document.getElementById('passwordInput').value && event.target.value !== '') {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const passwordChange = (event) => {
        if (event.target.value.length < 8 && event.target.value !== '') {
            setPasswordError('Password must be 8 characters');
        } else {
            setPasswordError('');
        }
    };

    const birthdateChange = (event) => {
        if (Date.now() - Date.parse(event.target.value) > 410240376000) {
            setDateError('');
            return;
        } else {
            setDateError('Must be 13+');
            return;
        }
    };
        
    return (
        <div className='signup-form'>
            <form method='POST' onSubmit={formSubmit}>
                <input id='firstNameInput' className='login-form-text-input' type='text' name='firstName' placeholder='First Name' maxLength='20' required></input>
                <div>
                    <p id='firstNameErrorMsg' className='form-error-message'>{firstNameError}</p>
                </div>

                <input id='lastNameInput' className='login-form-text-input' type='text' name='lastName' placeholder='Last Name' maxLength='20' required></input>                    
                <div>
                    <p id='lastNameErrorMsg' className='form-error-message'>{lastNameError}</p>
                </div>

                <input id='emailInput' onChange={emailChange} className='login-form-text-input' type='text' name='email' placeholder='Email' required></input>
                <div>
                    <p id='emailErrorMsg' className='form-error-message'>{emailError}</p>
                </div>

                <input id='usernameInput' onChange={usernameChange} className='login-form-text-input' type='text' name='username' placeholder='Username' maxLength='20' required></input>
                <div>
                    <p id='usernameErrorMsg' className='form-error-message'>{usernameError}</p>
                </div>

                <input id='passwordInput' onChange={passwordChange} className='login-form-text-input' type='password' name='password' placeholder='Password' maxLength='20' required></input>
                <div>
                    <p id='passwordErrorMsg' className='form-error-message'>{passwordError}</p>
                </div>

                <input id='confirmPasswordInput' onChange={confirmPasswordChange} className='login-form-text-input' type='password' name='confirm-password' placeholder='Re enter password' maxLength='20' required></input>
                <div>
                    <p id='confirmPasswordErrorMsg' className='form-error-message'>{confirmPasswordError}</p>
                </div>

                <textarea id='bioInput' className='bio-input' name='bio' placeholder='Bio' rows='8' maxLength='240'></textarea>

                <select id='genderInput' className='login-form-text-input gender-dropdown' name='gender' required>
                    <option value='' disabled>Gender</option>
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                    <option value='O'>Other</option>
                    <option value='N/A'>Choose not to say</option>
                </select>

                <p className='signup-label'>Birthdate</p>
                <input id='birthdateInput' onChange={birthdateChange} className='login-form-text-input' type='date' name='birthdate' required></input>
                <div>
                    <p id='dateErrorMsg' className='form-error-message'>{dateError}</p>
                </div>

                <input className='signup-btn' type='submit' value='Sign Up'></input>
                
                <div className='login-link-container'>
                    <Link className='signup-link' to='/login'>Log In</Link>
                </div>
            </form>  
        </div>
    )
}

export default SignupForm
