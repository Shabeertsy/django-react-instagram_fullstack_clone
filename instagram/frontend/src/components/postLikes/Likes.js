import React, { useState, useEffect } from 'react'
import axios from '../../Axios'


export default function Likes({ obj, likesHandler, unlikeHandler, isLiked, authToken }) {
    let [isLikedPost, setLikedPost] = useState()


    // single user likes get function 
    const getSingleLikesData = () => {
        axios.get(`api/likedpost/${obj.id}`, {
            headers: {
                'Authorization': `Bearer ${authToken.access}`
            }
        }).then((response) => {
            if (response.data.status != 0) {
                setLikedPost(true)
            } else {
                setLikedPost(false)
            }
        })
    }




    useEffect(() => {
        getSingleLikesData()

    }, [isLiked])



    return (
        <div>
            <div className="contents">
                <div className="d-flex">
                    {/* like button with conditions */}
                    <p className={`feed-bottom-icons ${isLikedPost ? 'feed-icons-liked' : ''}`} onClick={isLikedPost === false ? () => likesHandler(obj.id) : () => unlikeHandler(obj.id)} href="">{isLikedPost ? <i className="ri-heart-3-fill"></i> : <i class="ri-heart-3-line"></i>}</p>
                    <a className='feed-bottom-icons' href="" ><i className="ri-chat-3-line"></i></a>
                    <a className='feed-bottom-icons' href=""> <i className="ri-send-plane-fill"></i></a>
                </div>
                <div className="feed-discription border-bottom">
                    <p className='feed-likes'>{obj.likes_count}</p>
                    <p className='feed-dis'>{obj.image_title}</p>
                    <p className='text-muted'>View all 4 comments</p>
                    <input type="text" className='add-comment mb-3' placeholder='Add comment ...' />
                </div>

            </div>
        </div>
    )
}
