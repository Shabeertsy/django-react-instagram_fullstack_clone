import React, { useState,useContext } from 'react'
import AuthContext from '../../context/ContextAuth';
import { Link, useNavigate } from 'react-router-dom'

import './login.css'

export default function Login() {

    let {getLoginUsername,getLoginPassword,loginHandler}=useContext(AuthContext)


    return (

        <div>

            <div className="login-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="container">

                                <img className='login-img' src="" alt="" />

                            </div>

                        </div>

                        {/* right side box with input fields */}
                        <div className="col-lg-6">
                            <div className="container">
                                <div className="login-box border">
                                    <div className="insta-login-image">
                                        <img className='login-insta-img' src="https://github.com/Shabeertsy/instagram-login-clone-/blob/master/images/instagram-logo.png?raw=true" alt="" />

                                    </div>
                                    <div className="inputs">
                                        <input type="text" name='username' placeholder='Phone number,username or email' onChange={getLoginUsername} className='mt-2 inp p-2' />
                                        <input type="text" name='password' placeholder='password' onChange={getLoginPassword} className='p-2 mt-2 inp' />
                                        <button className='form-control mt-2 log-button bg-info' onClick={loginHandler} >Log in</button>
                                    </div>
                                    <div className="or-text">
                                        <h6 className='or'>OR</h6>
                                    </div>
                                    <div className="login-with mt-3">
                                        <a className='facebook' href="">Log in with Facebook</a>
                                    </div>
                                    <a href="" className='forgotten-pass mt-3'>forgotten password?</a>

                                </div>

                                <div className="login-box-bottom border">
                                    <div className="bottom-sign">
                                        <p className='bottom-dis'>Don't have an account?<Link to='/register' className='signup' href="">Sing up</Link></p>
                                    </div>
                                </div>
                                <div className="container d-flex align-items-center login-box-bottom">
                                    <p o>get the app.</p>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
