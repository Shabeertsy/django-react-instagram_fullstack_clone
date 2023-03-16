import React, { useState, useContext, useEffect } from 'react'
import axios from '../../Axios'
import AuthContext from '../../context/ContextAuth';


export default function FollowButton({ followedUserId }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const { authToken,setUpdated } = useContext(AuthContext)



    useEffect(() => {
        checkFollowers()

    }, [isClicked])


    // function for check Follower 
    const checkFollowers = async () => {

        await axios.get(`api/checkfollow/${followedUserId}/`, { headers: { 'Authorization': `Bearer ${authToken.access}` } }).then((response) => {
            if (response.data.status == true) {
                setIsFollowing(true)
            }
        }).catch(error => {
            console.log(error);
            console.log('follower not found')

        });
    }


    // function for follow button
    const handleFollowClick = async () => {
        await axios.post(`api/follow/${followedUserId}/`, { 'status': true }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${authToken.access}`
            }
        })
            .then((response) => {
                setIsFollowing(true);
                setIsClicked(true)
                setUpdated('follow')
            })
            .catch(error => {
                console.log(error);
            });
    };


    // function for unfollow button
    const handleUnFollowClick = async () => {
        await axios.delete(`api/unfollow/${followedUserId}/`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${authToken.access}`
            }
        })
            .then((response) => {
                setIsFollowing(false);
                setIsClicked(false)
                setUpdated('unfollow')


            })
            .catch(error => {
                console.log(error);
            });
    };




    return (
        <div>
            {
                isFollowing ? <p className='follow-account-link' onClick={handleUnFollowClick}>unfollow </p> : <p className='follow-account-link' onClick={handleFollowClick}>follow </p>
            }
        </div>
    )
}
