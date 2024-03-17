import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-body-white">
            <div class="container-fluid">
                <div class="navbar-brand text-center" style={{ display: 'flex' }}>
                    <img class="navbar-brand" src={logo} alt="" style={{ width: '50px', height: '50px' }} />
                    <p class="navbar-brand">Saidur's To Do</p>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/about-us">About Us</Link>
                        </li>
                    </ul>
                    <div class="d-flex" >
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to="/register">Register</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/login">Login</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/dashboard">My Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;