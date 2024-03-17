import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../routes/RoutesIndex';


const Register = () => {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [registerSuccess, setRegisterSuccess] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/profile', {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {

                    if (res.data.success === true) {
                        navigate('/dashboard');
                    }
                })
                .catch((err) => {
                    navigate('/register');
                })
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', {
            username,
            password,
            name
        }).then((res) => {

            if (res.data.success === true) {
                setRegisterSuccess(true);
                navigate('/login');
            }
        })
            .catch((err) => {

                setError(err.response.data.message);
            })
    }
    return (
        <div className='container-fluid '>
            <NavBar></NavBar>

            <div className='row ' >
                <div className='col-md-6 mx-auto  p-5 rounded ' style={{ boxShadow: '0 4px 8px 0 lightblue', marginTop: '100px', width: '500px' }}>
                    <div className='text-center'>
                        <h3 style={{ color: '#0D6EFD' }}>Register</h3>
                        <p>Create an account</p>
                    </div>
                    <form action="/register" className=' ' method='post' onSubmit={handleSubmit} style={{ width: '400px', margin: 'auto' }}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" name='name' className="form-control" placeholder="Your Name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" name='username' className="form-control" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name='password' className="form-control" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary" type='submit'> Register</button>
                        <div className='text-danger mt-3'>

                            {error && <p>{error}</p>}
                        </div>
                        <div className='text-center mt-3'>
                            <p>Already have an account?</p> <Link style={{ color: 'green', textDecoration: 'none' }} to="/login"><h5 >Login</h5></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;