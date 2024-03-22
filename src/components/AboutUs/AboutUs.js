import React from 'react';
import group3 from '../../images/group3.jpg'
import { Link } from 'react-router-dom';
import './AboutUs.css'
import logo from '../../images/logo.png'

const AboutUs = () => {
    return (
        <div className="container about-us ">
            <div className="row">
                <div className="col-md-10 col-sm-12 p-5  rounded bg-light mx-auto " style={{ opacity: '0.9' }}>
                    <div className=" text-center">
                        <img style={{ width: '200px' }} src={logo} alt="" />
                        <h5 className="mt-3">About Saidur's To Do</h5>
                        <hr className="w-25 mx-auto" />
                    </div>
                    <div className="mt-3" style={{  fontSize: '20px' }}>
                        <p>Welcome to Saidur's To-Do, a comprehensive task management application designed to streamline your daily activities and boost productivity.</p>
                        <p>Saidur's To Do is a web application that helps you organize your life and accomplish more with our user-friendly to-do app.</p>
                    </div>
                    <div className="mt-3">
                        <h6 >Key Features:</h6>
                        <ul  >
                            <li>Effortlessly create, organize, and prioritize tasks, set deadlines, and track progress in one streamlined interface.</li>
                            <li>Say goodbye to overwhelm and hello to efficient task management with Saidur's To Do.</li>
                            <li>Stay on top of your tasks and deadlines with our personal organizer app.</li>
                            <li>Boost your productivity with our productivity assistant app.</li>
                            <li>Stay focused and organized by managing your tasks efficiently.</li>
                            <li>Set reminders, categorize tasks, and track your progress effortlessly.</li>

                        </ul>

                    </div>
                    <div className="mt-3 mb-3">
                        <Link to="/register"><button className="btn mt-3 bg-success" style={{ color: 'white', width: '200px', fontFamily: 'cursive' }}>Get Started</button></Link>
                    </div>

                </div>
                {/* <div className="col-md-6 col-sm-12 mt-5 p-3">
                    <img src={group3} alt="" style={{ width: '100%'}} />

                </div> */}
            </div>



        </div>
    );
};

export default AboutUs;