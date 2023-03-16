import React, { useState } from 'react'
import axios from 'axios'
import './register.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    let [data, setData] = useState({})
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        try {
            const response = await axios.post('http://localhost:8000/api/user_register', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => { console.log('response: ', response.data) });
            console.log(response.data);
            
        } catch (error) {

        }
        navigate('/')
    };




    // function for get the data from in the input fields

    let getData = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData({ ...data, [name]: value })
    }

    return (
        <div>
            {/* registration page */}
            <div className="register-main">
                <div className="register">
                    <div className='inner-register'>
                        <div className="register-box border">

                            {/* top instagram logo */}
                            <div className="register-logo">
                                <img className='register-logo-image' src="https://github.com/Shabeertsy/instagram-login-clone-/blob/master/images/instagram-logo.png?raw=true" alt="" />
                            </div>
                            <div className="register-dis d-flex justify-content-center">
                                <p className='register-dis-p text-muted'>Sign up to see photos and <br /> videos from your friends.</p>
                            </div>
                            {/* login with facebook button */}
                            <div className="register-login-with-fb d-flex justify-content-center">
                                <button className="register-login-with-fb-btn bg-info">Login with Facebook</button>
                            </div>
                            <p className='text-center mt-3 mb-2 text-muted' >OR</p>
                            <div className="register-form text-center">
                                <input type="text " name='mobile' onChange={getData} className='input' placeholder='Mobile number or email address' /><br />
                                <input type="text " name='full_name' onChange={getData} className='input' placeholder='Fullname' /><br />
                                <input type="text " name='username' onChange={getData} className='input' placeholder='Username' /><br />
                                <input type="text" name='password' onChange={getData} className='input' placeholder='Password' />
                            </div>
                            {/* terms and conditions */}
                            <div className="register-terms mt-4">
                                <p className='terms-text text-muted'>People who use our service may have uploaded <br /> your contact information to Instagram. Learn more</p>
                                <p className='terms-text text-muted'>By signing up, you agree to our Terms, Privacy <br /> Policy and Cookies Policy.</p>
                            </div>
                            <div className="signup d-flex justify-content-center mb-4">
                                <button className="signup-button bg-info text-light" onClick={onSubmit}>Sign Up</button>
                            </div>


                        </div>

                        {/* bottom side for login */}
                        <div className="register-box-bottom border">
                            <div className="bottom-sign">
                                <p className='bottom-dis'>Have an account?<Link to='/' className='signup' href="">Log In</Link></p>
                            </div>
                        </div>
                        <div className="get-the-app text-center">
                            <p className='pt-2 pb-2'>get the app</p>
                        </div>
                        <div className="store-icons d-flex">
                            <img src="https://raw.githubusercontent.com/Shabeertsy/instagram-login-clone-/8cf4e45d36bb7da364f39d563024768a5301e782/images/app-store.svg" alt="" />
                            <img className='register-appstore-icon' src="https://raw.githubusercontent.com/Shabeertsy/instagram-login-clone-/8cf4e45d36bb7da364f39d563024768a5301e782/images/play-store.svg" alt="" />
                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}
