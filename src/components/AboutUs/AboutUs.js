import React from 'react';
import NavBar from './../NavBar/NavBar';
import Footer from './../Footer/Footer';
import group2 from '../../images/group2.jpg'
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-12 p-5 mt-5 rounded bg-light " style={{ textAlign: 'left' , boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                    <div className="mt-5">
                        <h5>About Saidur's To Do</h5>
                    </div>
                    <div className="mt-3">
                        <p>Saidur's To Do is a web application that helps you organize your life and accomplish more with our user-friendly to-do app.</p>
                    </div>
                    <div className="mt-3">
                        <h6>Key Features</h6>
                        <ul>
                            <li>Effortlessly create, organize, and prioritize tasks, set deadlines, and track progress in one streamlined interface.</li>
                            <li>Say goodbye to overwhelm and hello to efficient task management with Saidur's To Do.</li>
                            <li>Stay on top of your tasks and deadlines with our personal organizer app.</li>
                            <li>Boost your productivity with our productivity assistant app.</li>
                            <li>Stay focused and organized by managing your tasks efficiently.</li>
                            <li>Set reminders, categorize tasks, and track your progress effortlessly.</li>

                        </ul>

                    </div>
                    <div className="mt-3 mb-3">
                        <Link to="/register"><button className="btn mt-3 bg-success" style={{  color: 'white', width: '200px' }}>Get Started</button></Link>
                    </div>

                </div>
                <div className="col-md-6 col-sm-12 mt-5 p-3">
                    <img src={group2} alt="" style={{ width: '100%'}} />

                </div>
            </div>



        </div>
    );
};

export default AboutUs;