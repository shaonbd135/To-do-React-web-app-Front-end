import React from 'react';
import group from '../../images/group.png'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className='container bg-light '>
            <div className='row'>
                <div className='col-md-6 mt-5 align-self-center p-5'>
                    <h3 className='mb-3' style={{}}>Organize your life and accomplish more with our user-friendly to-do app</h3>
                    <small className='text-muted'>Effortlessly create, organize, and prioritize tasks, set deadlines, and track progress—all in one streamlined interface. Say goodbye to overwhelm and hello to efficient task management with Saidur's To Do.</small>
                    <div className='d-flex mt-5'>
                        <div style={{ marginRight: '15px' }}>
                            <Link to='/register'><button className='btn mt-3' style={{ backgroundColor: '#0D6EFD', color: 'white', width: '200px' }}>Get Started</button></Link>
                        </div>
                        <div style={{ marginRight: '15px' }}>
                            <Link to='/login'><button className='btn mt-3' style={{ backgroundColor: 'green', color: 'white', width: '200px' }}>Login</button></Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 p-5'>
                    <img className='img-fluid' src={group} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Main;