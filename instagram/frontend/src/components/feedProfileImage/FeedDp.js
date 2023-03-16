import React, { useEffect, useState } from 'react'
import axios from '../../Axios'


export default function FeedDp({ obj }) {
    let [userData, setUserData] = useState({})


    // get single user feed profile image
    useEffect(() => {
        axios.get(`api/feedprofile/${obj.user}`).then((response) => {
            setUserData(response.data[0])
        })
    }, [])


    return (
        <div>
            <img className='feed-icon' src={userData.image_url} alt="" />
        </div>
    )
}
