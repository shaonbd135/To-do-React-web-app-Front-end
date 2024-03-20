import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../routes/RoutesIndex';


const PrivateRoute = ({ children }) => {
    const [user, setUser] = useContext(ProfileContext);


    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            setUser({});
            return;
        }

        axios.get('http://localhost:5000/profile', {
            headers: {
                Authorization: token
            }

        })
            .then((res) => {

                if (res.data.success === true) {
                    setUser(res.data.user);

                }
            })
            .catch((err) => {
                navigate('/login');

            })
    }, [navigate, setUser]);

    return children;

};

export default PrivateRoute;