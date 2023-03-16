import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Loader from '../loader/Loader'
import './suggestion.css'
import AuthContext from '../../context/ContextAuth'
import axios from '../../Axios'
import FollowButton from '../followbutton/FollowButton'


export default function Suggestion() {

    const { user, authToken,image} = useContext(AuthContext)
    
    const navigate = useNavigate()
    const [currentUser, setCurrentuser] = useState([])
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    




    // get users data
    const usersData = async () => {
        await axios.get('api/users', { headers: { 'Authorization': `Bearer ${authToken.access}` } }).then((response) => {
            setUsers(response.data.data)
            console.log('usersdatat',response.data.data)
        })
    }



    // get profile info
    const profileInfo =async () => {
        const data =await axios.get(`api/single_user_view/${user.user_id}`).then((response) => {
           setCurrentuser(response.data)
           setLoading(false)
         
        })
    }



    // get login user data
    useEffect(() => {
        usersData()
        profileInfo()
    }, [])



    return (
        <div>
            {
                !loading ? <div className="sug-box">
                    {/* right corner suggestion container */}
                    <div className="account">
                        <div className="d-flex">
                            <img onClick={() => navigate('/profile')} className='account-image' src={image ? image.image_url : ''} alt="" />
                            <div className="account-name mx-3 mt-2">
                                <h6 className=''>{currentUser.full_name}</h6>
                                <h6 className=''></h6>
                                <p className='text-muted text-capitalize' >{currentUser.username}</p>
                            </div>
                            <div className="switch-account" >
                                <a href="" className=' switch-account-link'>switch</a>
                            </div>
                        </div>
                        <div className="sug-list">
                            <p className='text-muted list-head mt-2' >Suggestions for you</p>
                            {
                                users.map((obj) => (
                                    <div className="d-flex">
                                        <Link to=''> <img className='account-list-image'src={obj.image_url} alt="profile" /></Link>
                                        <div className="account-name mx-3">
                                            <label className=''>{obj.username}</label>
                                            <p className='list-follow-text text-muted text-capitalize' >Followed by _rinsha + 6 more</p>
                                        </div>
                                        <div className="follow-account">                                        
                                        <FollowButton followedUserId={obj.user_id}/>   
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
                    : <div className="loading">
                        <Loader />
                    </div>
            }
        </div>
    )
}
