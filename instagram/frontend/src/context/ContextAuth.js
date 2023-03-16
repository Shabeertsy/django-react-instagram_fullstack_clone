import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios'
import jwt_decode from "jwt-decode";


const AuthContext = createContext()

export default AuthContext;



export const AuthProvider = ({ children }) => {
    let [loading, setLoading] = useState(true)

    const [username, setUsername] = useState({})
    const [password, setPassword] = useState()
    const [authToken, setAuthtoken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwt_decode((localStorage.getItem('authToken'))) : null)

    const [feedData, setFeedData] = useState([])
    const [postCount, setPostCount] = useState()
    const [followCount, setFollowCount] = useState({})
    const [image, setImage] = useState(false)
    let [updated,setUpdated]=useState('')



    const navigate = useNavigate()






    // to get login form data
    const getLoginUsername = (e) => {
        setUsername(e.target.value)
    }
    const getLoginPassword = (e) => {
        setPassword(e.target.value)
    }




    // login button handler  function
    let loginHandler = async (e) => {

        try {
            const response = await axios.post('api/token/', { 'username': username, 'password': password }, { headers: { 'Content-Type': 'application/json', } }).then(response => {

                if (response.status === 200) {

                    localStorage.setItem("authToken", JSON.stringify(response.data))
                    setAuthtoken(response.data)
                    setUser(jwt_decode(response.data.access))
                }
                navigate('/')
            })
        }
        catch (error) {

        }
    }





    // logout function

    const logout = () => {
        setAuthtoken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('/login')
    }




    // update token

    const updateToken = () => {

        console.log('updated');
        let data = axios.post('api/token/refresh/', { 'refresh': authToken.refresh }, { headers: { 'Content-Type': 'application/json', } }).then((response) => {

            if (response.status === 200) {
                setAuthtoken(response.data)
                setUser(jwt_decode(response.data.access))

                localStorage.setItem('authToken', JSON.stringify(response.data))
            } else {
                logout()
            }

        })

    }





    // verify token

    const verifyToken = async () => {
        try {
            await axios.post('api/token/verify/', { 'token': authToken.refresh }, { headers: { 'Content-Type': 'application/json', } }).then((response) => {
            })
        }
        catch (error) {
            console.log('error', error);
            logout()

        }
    }




    // get all user posts
    const getFeedData = () => {

        axios.get('api/viewfeeds', { headers: { 'Authorization': `Bearer ${authToken.access}` } }).then((response) => {
            if (response.status === 200) {
                setFeedData(() => response.data.data)

            } else {
                console.log('error');
            }
        })
    }





    // post count
    const postCountFind = (count) => {
        setPostCount(count)
    }


    // follow count
    const getFollowCount = () => {
        if (user != null) {
            axios.get(`api/followcount/${user.user_id}/`).then((response) => {
                setFollowCount(response.data)
            })
        }
    }


    // get profile image
    const getProfileImage = () => {
        axios.get(`api/getprofileimage/${user ? user.user_id : ''}/`).then((response) => {
            setImage(response.data[0])
        })
    }

    // delete story

    const deleteStory = () => {
        axios.get('api/storydelete').then((response) => {
            console.log('story delete', response.data);
        })
    }



    // context data

    let contextData = {
        user: user,
        authToken: authToken,
        loginHandler: loginHandler,
        getLoginUsername: getLoginUsername,
        getLoginPassword: getLoginPassword,
        logout: logout,
        updateToken: updateToken,
        verifyToken: verifyToken,
        feedData: feedData,
        getFeedData: getFeedData,
        postCount: postCount,
        postCountFind: postCountFind,
        followCount: followCount,
        getFollowCount: getFollowCount,
        getProfileImage: getProfileImage,
        image: image,
        updateToken:updateToken,
        setUpdated:setUpdated,
        updated:updated,



    }



  




    let timeLimit = 1000 * 60 * 3

    useEffect(() => {
        getFollowCount()
        getProfileImage()
        if (authToken&&loading){
            updateToken()
        }

        let timers = setInterval(() => {
            if (authToken) {
                updateToken()
                deleteStory()

            }

        }, timeLimit);
        verifyToken()

        setLoading(false)
        return () => { clearInterval(timers) }

    }, [loading, authToken])


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
