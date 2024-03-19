import React, { useContext } from 'react';
import DashNav from './DashNav';
import Footer from './../Footer/Footer';
import { ProfileContext } from '../../routes/RoutesIndex';

const Dashboard = () => {
    const [user, setUser] = useContext(ProfileContext);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 " style={{ backgroundColor: '#3F000F', width: '230px', height: '100vh' }}>
                    <DashNav></DashNav>
                </div>
                <div className="col-md-9 text-center mt-5 p-5 ">

                    <h4 style={{ color: 'green' }}>Welcome {user.name}</h4>

                </div>
            </div>
            

        </div>
    );
};

export default Dashboard;