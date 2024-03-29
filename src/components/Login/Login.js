import React, { useContext, useEffect, useState } from 'react';
import NavBar from './../NavBar/NavBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../routes/RoutesIndex';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [registerSuccess, setRegisterSuccess] = useContext(UserContext);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://to-do-react-web-app-back-end-server.onrender.com/profile', {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {

                    if (res.data.success === true) {
                        navigate('/dashboard');
                        setRegisterSuccess('');
                    }
                })
                .catch((err) => {
                    navigate('/login');
                })
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://to-do-react-web-app-back-end-server.onrender.com/login', {
            username,
            password
        })
            .then((res) => {

                if (res.data.success === true) {
                    setRegisterSuccess('');
                    
                    navigate('/dashboard');
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
                toast.error(err.response.data.message , {
                    position: "bottom-right",
                  });
            })
    }


    return (
        <div className='container-fluid  ' style={{ height: '100vh' }}>


            <div className='row '  >

                <div className='col-md-6 mx-auto  p-5 rounded ' style={{ boxShadow: '0 4px 8px 0 lightblue', marginTop: '100px', width: '500px' }}>
                    <div className='text-center'>
                        {registerSuccess === true ? <div className='alert alert-success'>Registration Successful, Please Login</div> : null}
                    </div>
                    <div className='text-center'>
                        <h3 style={{ color: 'green' }}>Login</h3>
                        <p >Login to your account</p>
                    </div>
                    <form action="/login" className=' ' onSubmit={handleSubmit} method='post' style={{ width: '400px', margin: 'auto' }}>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Username</label>
                            <input type="text" name='username' className="form-control" id="exampleFormControlInput1" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label for="inputPassword5" className="form-label">Password</label>
                            <input type="password" name='password' id="inputPassword5" className="form-control" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-success" type='submit'> Login</button>
                        <div className='text-danger mt-3'>

                            {error && <p>{error}</p>}

                        </div>
                        <div className='text-center mt-3'>
                            <p>Don't have an account?</p> <Link style={{ color: '#0D6EFD', textDecoration: 'none' }} to="/register"><h5 >Register</h5></Link>
                        </div>


                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Login;