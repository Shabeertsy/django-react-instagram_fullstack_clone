import axios from '../../Axios'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Grid from '../../components/profileGrid/Grid'
import Sidebar from '../../components/sidebar/Sidebar'
import AuthContext from '../../context/ContextAuth'
import ImageUploader from '../../components/postUpload/Image'

import './profile.css'




export default function Profile() {

    const { user, postCount, followCount,getProfileImage,image,updated } = useContext(AuthContext)

    const [currentUser, setCurrentuser] = useState({})
    const [uploads, setUploads] = useState(false)
    const [items, setItems] = useState(<Grid />)


    // get single user profile data

    useEffect(() => {
        getProfileImage()

        // get single user profile details
        let data = axios.get(`api/single_user_view/${user.user_id}`).then((response) => {
            setCurrentuser(response.data)
        })
    }, [updated])


    // grid selector
    const selector = (item) => {
        // setItems(item)
        console.log('items', item);

        if (item === 'posts') {
            setItems(<Grid />)
        } else if (item === 'reels') {
            setItems('')
        } else {
            setItems('')
        }
    }



    // function for closing uploading window 
    let windowOpenHandlers = () => {
        setUploads(true)
    }

    let windowCloseHandler = (w) => {
        setUploads(false)

    }


    return (
        <div>
            {
                uploads ? <ImageUploader images={image} prop={windowCloseHandler} scope={'Add profile image'} url={`api/profileimage/${user.user_id}/`} /> : ''

            }
            {
                uploads ? <p onClick={windowCloseHandler} className="close-icon-p"><i class="ri-close-line"></i></p> : ''
            }

            <div className="profile d-flex">

                {/* left section with sidebar */}
                <div className="p-left-outer-container">
                    <div className="p-left-container">
                        <Sidebar />
                    </div>
                </div>

                {/* right section with user details */}
                <div className="p-right-container">
                    <div className="p-inner-container">
                        {/* user profile top section  */}
                        <div className="d-flex profile-top border-bottom mt-5">
                            {/* profile image section */}
                            <div className="p-image mb-5">
                                <div onClick={windowOpenHandlers} className="p-inner-image px-5">
                                    <img src={image ? image.image_url : ''} alt="" className="profile-on-image" />
                                </div>
                            </div>

                            {/* profile datas */}
                            <div className="profile-data">
                                <div className="p-username">
                                    <h6 className='text-capitalize'>{currentUser.full_name}</h6>
                                    <p >Edit Profile</p>
                                    <p className='settings-icon'><i className="ri-search-line"></i></p>

                                </div>
                                <div className="p-followers">
                                    <p className='p-list'>{postCount} Posts</p>
                                    <p className='p-list'>{followCount[0] ? followCount[0].followers_count : ''} Followers</p>
                                    <p className='p-list'>{followCount[0] ? followCount[0].following_count : ''} Following</p>
                                </div>
                                <div className="p-bio mt-3">
                                    <h5>{currentUser.username}</h5>
                                    <p>bio discriptions</p>
                                </div>
                            </div>
                        </div>

                        {/* user profile bottom section  */}
                        <div className="profile-bottom ">
                            <div className="container-bottom mt-3 ">
                                <div className="container-bottom-inner">
                                    <div className="post-details">
                                        <p onClick={() => selector('posts')} className='text-uppercase media-headers'>Post</p>
                                        <p onClick={() => selector('reels')} className='text-uppercase media-headers'>Reels</p>
                                        <p onClick={() => selector('tags')} className='text-uppercase media-headers'>tagged</p>
                                    </div>
                                </div>

                            </div>
                            <div className="grid-pro">
                                {
                                    items
                                }
                            </div>

                        </div>


                    </div>
                </div>

            </div>

        </div>
    )
}
