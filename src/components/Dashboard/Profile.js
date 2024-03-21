import React, { useContext, useState } from 'react';
import DashNav from './DashNav';
import { ProfileContext } from '../../routes/RoutesIndex';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useContext(ProfileContext);
    const [editedUser, setEditedUser] = useState({});
    const [newPassword, setnewPassword] = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [showPasswordEdit, setShowPasswordEdit] = useState(false);


    const editProfile = () => {
        setShowPasswordEdit(false);
        setShowProfileEdit(true);

    }
    const editPassword = () => {

        setShowProfileEdit(false);
        setShowPasswordEdit(true);
    }

    const handleEditedUserInfo = (e) => {

        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }

    const handleEditedPassword = (e) => {

        setnewPassword({ ...newPassword, [e.target.name]: e.target.value });
    }

    const handleUserinfoSubmit = (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.patch('http://localhost:5000/update-profile', {
            id: user.id,
            currentUsername: user.username,
            newUsername: editedUser.newUsername,
            name: editedUser.name

        }, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setUser(res.data.user);
                    setShowProfileEdit(false);
                    setSuccess(res.data.message);
                    setTimeout(() => {
                        setSuccess('');
                    }, 4000);
                }
            })
            .catch((err) => {

                setError(err.response.data.message);
                setTimeout(() => {
                    setError('');
                }, 4000);
            })
    }
    

    const handlePasswordSubmit = (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.patch('http://localhost:5000/update-password', {
            username: user.username,
            currentPassword: newPassword.currentPassword,
            newPassword: newPassword.newPassword

        }, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setShowPasswordEdit(false);
                    setSuccess(res.data.message);
                    setTimeout(() => {
                        setSuccess('');
                    }, 4000);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
                setTimeout(() => {
                    setError('');
                }, 4000);
            })
    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-auto">
                    <DashNav></DashNav>

                </div>

                <div className="col-md-10 col-sm-8 mx-auto">
                    <div className="p-2 mt-2">
                        <h5 className='text-center text-muted'>Profile Details</h5>
                        <hr style={{ width: '100%', color: 'gray', height: '2px' }} />
                    </div>
                    <div className='row'>

                        <div className='col-md-10 mx-auto'>
                            <div className='row'>
                                <div className={`col-md-${showProfileEdit || showPasswordEdit ? '6' : '12'} mb-5`}>
                                    <div class="card m-auto" style={{ width: '22rem' }}>
                                        <div class="card-body text-center">
                                            {
                                                success && (
                                                    <div class="alert alert-success " role="alert"> {success}</div>
                                                )
                                            }

                                        </div>
                                        <div class="card-header text-center">
                                            <i style={{ fontSize: '50px' }} class="bi bi-person-workspace text-success"></i>
                                        </div>

                                        <div class="card-body text-center">
                                            <h5 class="card-title">Name: {user.name}</h5>
                                            <p class="card-text">Username: {user.username}</p>
                                            <button class="btn btn-primary m-2" onClick={editProfile}>Edit Profile</button>
                                            <button class="btn btn-success m-2" onClick={editPassword}>Change Password</button>
                                        </div>

                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    {
                                        showProfileEdit && (
                                            <form className='m-auto rounded' style={{ width: '70%', boxShadow: '1px 1px 1px 1px gray', padding: '40px' }} onSubmit={handleUserinfoSubmit} method='post'  >
                                                <div class="text-center">
                                                    {
                                                        error && (
                                                            <div class="alert alert-danger" role="alert"> {error}</div>
                                                        )
                                                    }
                                                </div>
                                                <div class="text-end ">
                                                    <i onClick={() => setShowProfileEdit(false)} class="bi bi-x-circle " style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }}></i>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Name</label>
                                                    <input type="text" name='name' class="form-control" defaultValue={user.name} onChange={handleEditedUserInfo} />

                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Username</label>
                                                    <input type="text" name='newUsername' class="form-control" defaultValue={user.username} onChange={handleEditedUserInfo} />
                                                </div>
                                                <button type="submit" class="btn btn-primary">Update Profile</button>
                                            </form>
                                        )
                                    }
                                    {
                                        showPasswordEdit && (
                                            <form className='m-auto rounded' style={{ width: '70%', boxShadow: '1px 1px 1px 1px gray', padding: '40px' }} onSubmit={handlePasswordSubmit} method='post'>
                                                <div class="text-center">
                                                    {
                                                        error && (
                                                            <div class="alert alert-danger" role="alert"> {error}</div>
                                                        )
                                                    }
                                                </div>
                                                <div class="text-end ">
                                                    <i onClick={() => setShowPasswordEdit(false)} class="bi bi-x-circle " style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }}></i>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Current Password</label>
                                                    <input type="password" name='currentPassword' class="form-control" placeholder='Enter your current password' onChange={handleEditedPassword} required />
                                                </div>

                                                <div class="mb-3">
                                                    <label class="form-label">New Password</label>
                                                    <input type="password" name='newPassword' class="form-control" placeholder='Enter your new password' onChange={handleEditedPassword} required />
                                                </div>
                                                <button type="submit" class="btn btn-primary">Update Password</button>
                                            </form>
                                        )
                                    }
                                </div>

                            </div>
                        </div>

                    </div>


                </div>
            </div>


        </div>
    );
};

export default Profile;