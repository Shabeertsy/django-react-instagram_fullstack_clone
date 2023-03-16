import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import AuthContext from '../../context/ContextAuth'
import ImageUploader from '../postUpload/Image'
import { Link } from 'react-router-dom'

import './sidebar.css'



export default function Sidebar() {

    const{user,logout}=useContext(AuthContext)

    const [upload, setUpload] = useState(false)

    // function for closing uploading window 
    let windowOpenHandler = () => {
        setUpload(true)
    }
    let windowCloseHandler = (w) => {
        setUpload(false)
    }

    useEffect(()=>{

    },[upload])


    return (
        <div>
            {
                upload ? <ImageUploader scope={'Create a new post'} prop={windowCloseHandler} url={'api/postupload'} /> : ''

            }
            {
                upload ? <p onClick={windowCloseHandler} className="close-icon"><i class="ri-close-line"></i></p> : ''
            }


            <div className="sidebar">
                <div className="side-logo">
                    <img className='sidebar-logo' src="https://github.com/Shabeertsy/instagram-login-clone-/blob/master/images/instagram-logo.png?raw=true" alt="" />
                </div>
                <div className="side-logo insta-icon web-icons">
                    <p className='sidebar-icon'><i className="ri-instagram-line"></i></p>
                </div>

                <div className="d-flex">
                    <Link to='/' className='sidebar-icon home-icon'><i className="ri-home-4-fill"></i></Link >
                    <Link to='/' className="mx-3 pt-2 sidebar-text font-weight-bold">Home</Link>
                </div>
                <div className="d-flex">
                    <p className='sidebar-icon web-icons'><i className="ri-search-line"></i></p>
                    <p className="mx-3 pt-2 sidebar-text">Search</p>
                </div>
                <div className="d-flex">
                    <p className='sidebar-icon'><i className="ri-compass-line"></i></p>
                    <p className="mx-3 pt-2 sidebar-text">Explore</p>
                </div>
                <div className="d-flex">
                    <p className='sidebar-icon'><i className="ri-movie-line"></i></p>
                    <p className="mx-3 pt-2 sidebar-text">Reels</p>
                </div>
                <div className="d-flex">
                    <p className='sidebar-icon'><i className="ri-chat-3-line"></i></p>
                    <p className="mx-3 pt-2 sidebar-text">Messages</p>
                </div>
                <div className="d-flex">
                    <p className='sidebar-icon web-icons'><i className="ri-heart-3-line"></i></p>
                    <p className="mx-3 pt-2 sidebar-text">Notifications</p>
                </div>
                <div className="d-flex">
                    <p className='sidebar-icon'><i onClick={windowOpenHandler} className="ri-add-box-line"></i></p>
                    <p onClick={windowOpenHandler} className="mx-3 pt-2 sidebar-text">Create</p>
                </div>
              {
                user ? <div className="d-flex">
                <p className='sidebar-icon'><i onClick={logout} className="ri-user-3-line"></i></p>
                <p onClick={logout} className="mx-3 pt-2 sidebar-text">Logout</p>
            </div> : ''
              }
            </div>

        </div>
    )
}
