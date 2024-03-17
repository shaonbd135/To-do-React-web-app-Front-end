import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import { ProfileContext } from '../../routes/RoutesIndex';

const DashNav = () => {
    const [user, setUser] = useContext(ProfileContext);
    const navigate = useNavigate();
    const FontStyle = {
        color: 'white',
        fontSize: '15px',
        textDecoration: 'none',
    }
    const iconStyle = {
        color: 'white',
        fontSize: '20px',
        marginRight: '10px',
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({});
        navigate('/login');
    }
    return (
        <div className="container-fluid ">
            <div className='mt-3 text-center p-2 bg-white rounded' style={{ borderBottom: '2px solid white' }} >
                <img style={{ width: '50px' }} src={logo} alt="" />
                <h4 style={{ color: 'black' }}>Saidur's To Do</h4>
            </div>
            <div className='mt-3  p-2 text-center' style={{ borderBottom: '2px solid white' }} >
                <h5 style={{ color: 'white' }}><i class="bi bi-person-circle" style={iconStyle}></i> {user.name}</h5>
                <p style={{ color: 'white', marginTop: '20px' }}>  <i class="bi bi-calendar2" style={iconStyle}></i>{new Date().toDateString()}</p>
            </div>
            <div style={{ backgroundColor: '#3F000F', marginTop: '20px' }}>
                <ul className='nav flex-column '>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard" style={FontStyle}>
                            <p> <i class="bi bi-card-text" style={iconStyle}></i> Dashboard</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/create-task" style={FontStyle}>
                            <p  > <i class="bi bi-card-list" style={iconStyle}></i>My Task</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/create-project" style={FontStyle}>
                            <p > <i class="bi bi-plus-circle" style={iconStyle}></i>Create New Task</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/create-project" style={FontStyle}>
                            <p > <i class="bi bi-gear" style={iconStyle}></i>Setting</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link text-white" style={FontStyle}>
                            <p style={{ cursor: 'pointer' }} onClick={handleLogout} > <i class="bi bi-box-arrow-right" style={iconStyle}></i>Logout</p>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-white" style={{ color: 'white', textDecoration: 'none', marginTop: '100px' }}>
                            <p > <i class="bi bi-house" style={{ color: 'white', fontSize: '20px', marginRight: '10px', }} ></i>Back To Home</p>
                        </Link>
                    </li>

                </ul>

            </div>
        </div>
    );
};

export default DashNav;