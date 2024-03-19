import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import { ProfileContext } from '../../routes/RoutesIndex';

const DashNav = () => {
    const [user, setUser] = useContext(ProfileContext);
    const navigate = useNavigate();
   
    const iconStyle = {
        color: '#3F000F',

    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({});
        navigate('/login');
    }
    return (
        <div class="container-fluid " >
            <div class="row">
                <div class="col-sm-auto ">
                    <div class="d-flex flex-sm-column flex-row flex-nowrap  mx-auto align-items-center " >

                        <Link to='/'><img class="navbar-brand mt-2" src={logo} alt="" style={{ width: '50px', height: '50px' }} /></Link>

                        <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto  text-center align-items-center">
                            <li class="nav-item">
                                <Link to="/Dashboard" class="nav-link ">
                                    <i style={iconStyle} class="bi-house fs-1"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Dashboard/create-task" class="nav-link py-3 " >
                                    <i style={iconStyle} class="bi bi-plus-circle fs-1"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/my-tasks" class="nav-link py-3 " >
                                    <i style={iconStyle} class="bi bi-card-list fs-1"></i>
                                </Link>
                            </li>
                            <li>
                                <Link class="nav-link py-3 "  to={"/dashboard/settings"} >
                                    <i style={iconStyle} class="bi bi-gear fs-1"> </i>
                                </Link>
                            </li>
                            
                        </ul>
                        <div class="dropdown">
                            <Link class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                                <i style={iconStyle} class="bi-person-circle h2"></i>
                            </Link>
                            <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                                <li><Link to="/dashboard/profile" class="dropdown-item" >Profile</Link></li>
                                <li><p style={{ cursor: 'pointer' }} class="dropdown-item" onClick={handleLogout}  >Logout</p></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default DashNav;











