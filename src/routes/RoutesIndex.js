import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Error from '../components/Error/Error';
import Dashboard from '../components/Dashboard/Dashboard';
import AboutUs from './../components/AboutUs/AboutUs';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
export const ProfileContext = createContext();
const RoutesIndex = () => {
    const [registerSuccess, setRegisterSuccess] = useState({});
    const [user, setUser] = useState({});
    return (
        <UserContext.Provider value={[registerSuccess, setRegisterSuccess]}>
            <ProfileContext.Provider value={[user, setUser]}>
                <BrowserRouter >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='login' element={<Login />} />
                        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </BrowserRouter>
            </ProfileContext.Provider>
        </UserContext.Provider>
    );
};

export default RoutesIndex;