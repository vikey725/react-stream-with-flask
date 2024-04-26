// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './components/Home';
import RequireAuth from './authentication/RequireAuth'
import AuthProvider from './authentication/authContextProvider';
import {useAuthContext} from './authentication/AuthContext'

function App() {
    const auth = useAuthContext();
    console.log(auth)

    

    return (
        <Router>
            <AuthProvider>
            <Routes>
                <Route path='/' element={<RequireAuth><HomePage /></RequireAuth>} />
                <Route path="/register" element={<Register />}/>
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App;
