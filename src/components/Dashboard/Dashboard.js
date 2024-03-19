import React, { useContext } from 'react';
import DashNav from './DashNav';
import Footer from './../Footer/Footer';
import { ProfileContext } from '../../routes/RoutesIndex';

const Dashboard = () => {
    const [user, setUser] = useContext(ProfileContext);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1 ">
                    <DashNav></DashNav>
                </div>
                <div className="col-md-10 text-center mt-5 p-5 ">

                    <h4 style={{ color: 'green' }}>Welcome {user.name}</h4>

                </div>
            </div>
            

        </div>
    );
};

export default Dashboard;