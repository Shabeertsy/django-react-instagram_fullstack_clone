import {Navigate} from 'react-router-dom'
import React ,{useContext} from 'react'
import Home from '../pages/home/Home';
import AuthContext from '../context/ContextAuth';


const PrivateRoute = () => {
 
    const {user}=useContext(AuthContext)

    return user ? <Home /> : <Navigate to="/login" />
}

export default PrivateRoute;