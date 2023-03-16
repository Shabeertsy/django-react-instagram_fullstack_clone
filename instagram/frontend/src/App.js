import './App.css';

import { useState } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/registration/Register';
import Profile from './pages/profile/Profile';
import PrivateRoute from './utils/PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/ContextAuth';



function App() {
  return (
    <div>
    
      <Routes>
          <Route exact path='/' element={<PrivateRoute />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/register' element={<Register />} />
      </Routes>
     

    </div>
  );
}

export default App;
