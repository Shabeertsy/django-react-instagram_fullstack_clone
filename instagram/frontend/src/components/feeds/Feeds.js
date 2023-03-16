import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/ContextAuth'
import axios from '../../Axios'
import Likes from '../postLikes/Likes'
import FeedDp from '../feedProfileImage/FeedDp'

import './feeds.css'




export default function Feeds() {
    const { feedData, getFeedData, authToken,updated } = useContext(AuthContext)
    let [likesData, setLikesData] = useState({})
    let [isLiked, setIsLiked] = useState()


    // like button 
    const likesHandler = (post_id) => {
        axios.post(`api/addlikes/${post_id}`, { 'status': true }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${authToken.access}`
            }
        }).then((response) => {
            setLikesData(response.data)
            setIsLiked(true)
        })
    }


    // unlike button function
    let unlikeHandler = (post_id) => {
        axios.post(`api/unlike/${post_id}`, { 'status': true }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${authToken.access}`
            }
        }).then((response) => {
            setIsLiked(false)
        })
    }


    useEffect(() => {
        getFeedData()
    }, [isLiked,updated])


    return (
        <div>
            {
                feedData.map((obj, index) => (

                    // user feeds area
                    <div className="feeds">
                        <div className="feed-profile d-flex">
                            <FeedDp obj={obj}/>
                            <p className='feed-profile-name mx-2 pt-2'>{obj.username}</p>
                            <p className='text-muted mx-2 pt-2'>{obj.time_difference} ago</p>
                            <p className='mx-auto'>...</p>

                        </div>
                        <div className="media">
                            <div className="feed-image-container">
                                <img src={obj.image_url} className='feed-image' alt="" />
                            </div>
                        </div>
                        <div className="contents">
                            <Likes obj={obj} likesHandler={likesHandler} authToken={authToken} unlikeHandler={unlikeHandler} isLiked={isLiked} />
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
