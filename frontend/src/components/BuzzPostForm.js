import React from 'react'
import axios from 'axios'
import BACKEND_URL from '../backendURL'

const BuzzPostForm = ({update}) => {

    const buttonClick = (event) => {
        // handle posting buzz
        axios.post(BACKEND_URL+'/api/postBuzz', {token: window.token, content: document.getElementById('content').value})
            .then(res => {
                if (res.data.status_code != 0) {
                    alert('Failed to post buzz');
                } else {
                    // posted, clear form
                    document.getElementById('content').value = '';
                    update();
                }
            })
            .catch(err => {
                alert('Failed to post buzz');
            })
        
    }

    return (
        <div className='buzz-post-form'>
            <div className='buzz-post-form-content'>
                <textarea id='content' className='buzz-post-form-content-input' placeholder='Say something here...' rows='8' maxLength='240'></textarea>
            </div>

            <div className='buzz-post-form-footer'>
                <button className='buzz-post-form-button' type='button' onClick={buttonClick}>Post</button>
            </div>
        </div>
    )
}

export default BuzzPostForm
