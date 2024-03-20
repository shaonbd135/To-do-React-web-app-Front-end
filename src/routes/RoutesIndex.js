import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Error from '../components/Error/Error';
import Dashboard from '../components/Dashboard/Dashboard';
import AboutUs from './../components/AboutUs/AboutUs';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import CreateTask from '../components/Dashboard/CreateTask';
import MyTask from '../components/Dashboard/MyTask';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Profile from '../components/Dashboard/Profile';


export const UserContext = createContext();
export const ProfileContext = createContext();
const RoutesIndex = () => {
    const [registerSuccess, setRegisterSuccess] = useState({});
    const [user, setUser] = useState({});
    return (
        <UserContext.Provider value={[registerSuccess, setRegisterSuccess]}>
            <ProfileContext.Provider value={[user, setUser]}>
                <BrowserRouter >
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='login' element={<Login />} />
                        <Route path='/dashboard' element={<PrivateRoute children={<Dashboard />}></PrivateRoute>} />
                        <Route path='/dashboard/create-task' element={<PrivateRoute children={<CreateTask />}></PrivateRoute>} />
                        <Route path='/dashboard/my-tasks' element={<PrivateRoute children={<MyTask />}></PrivateRoute>} />
                        <Route path='/dashboard/profile' element={<PrivateRoute children={<Profile />}></PrivateRoute>} />

                        <Route path="*" element={<Error />} />
                    </Routes>
                    <Footer></Footer>

                </BrowserRouter>

            </ProfileContext.Provider>
        </UserContext.Provider>
    );
};

export default RoutesIndex;