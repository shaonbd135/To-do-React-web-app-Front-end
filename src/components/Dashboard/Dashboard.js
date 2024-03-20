import React, { useContext } from 'react';
import DashNav from './DashNav';
import Footer from './../Footer/Footer';
import { ProfileContext } from '../../routes/RoutesIndex';
import logo from '../../images/logo.png';

const Dashboard = () => {
    const [user, setUser] = useContext(ProfileContext);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-auto ">
                    <DashNav></DashNav>
                </div>
                <div className="col-md-10 col-sm-6 text-center  p-5 ">
                    <img src={logo} alt="" style={{ width: '200px' }} />

                    <h4 className='mt-5' style={{ color: 'green' }}>Welcome {user.name}</h4>

                </div>
            </div>
            

        </div>
    );
};

export default Dashboard;