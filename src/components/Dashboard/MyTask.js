import React, { useContext, useEffect, useState } from 'react';
import DashNav from './DashNav';
import { ProfileContext } from '../../routes/RoutesIndex';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyTask.css';


const MyTask = () => {
    const navigate = useNavigate();

    const [user, setUser] = useContext(ProfileContext);
    const [taskList, setTaskList] = useState([]);
    const [CompletedTasks, setCompletedTasks] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [error, setError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:5000/tasks', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    const tasks = res.data.tasks;
                    const completed = [];
                    const todo = [];

                    tasks.forEach((task) => {
                        if (task.isDone) {
                            completed.push(task);
                        } else {
                            todo.push(task);
                        }
                    });

                    setCompletedTasks(completed);
                    setTaskList(todo);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, [navigate, updateSuccess, deleteSuccess]);

    const handleDelete = (taskId) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:5000/delete-task/${taskId}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setDeleteSuccess(res.data.message);
                    setTimeout(() => {
                        setDeleteSuccess('');
                    }, 7000);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
                setTimeout(() => {
                    setError('');
                }, 7000);
            });
    }

    const handleComplete = (taskId) => {
        const token = localStorage.getItem('token');
        axios.patch('http://localhost:5000/update-task', {
            id: taskId,
            isDone: true
        }, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setUpdateSuccess(res.data.message);
                    setTimeout(() => {
                        setUpdateSuccess('');
                    }, 7000);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
                setTimeout(() => {
                    setError('');
                }, 7000);
            });
    }




    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 " style={{ backgroundColor: '#3F000F', width: '230px', height: '100vh' }}>
                    <DashNav></DashNav>
                </div>
                <div className="col-md-9 text-center mt-3 p-5 m-auto" >
                    <h4 style={{ color: 'green' }}>My Tasks</h4>

                    <div className="table-container" style={{ marginBottom: '100px' }}>
                        <div className="mb-3 text-center">
                            {updateSuccess && (
                                <div className="alert alert-success" role="alert">
                                    {updateSuccess}
                                </div>
                            )}
                            {deleteSuccess && (
                                <div className="alert alert-success" role="alert">
                                    {deleteSuccess}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                        </div>
                        <table className="table text-center table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Task Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Created Date</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Actions</th> {/* Add a new column for actions */}
                                </tr>
                            </thead>
                            <tbody>

                                {taskList.map((task, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{task.taskName}</td>
                                        <td>{task.description}</td>
                                        <td>{new Date(task.createdOn).toDateString()}</td>
                                        <td>{new Date(task.dueDate).toDateString()}</td>
                                        <td>
                                            {/* Button to mark task as done */}
                                            <button className='btn btn-success m-2 ' onClick={() => handleComplete(task._id)} >Mark as Done</button>
                                            <button className='btn btn-primary m-2' >Edit</button>
                                            {/* Button to delete task */}
                                            <button className='btn btn-danger'  >Delete</button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div>
                            {
                                taskList.length === 0 && (
                                    <h4>No tasks found</h4>
                                )
                            }
                        </div>

                    </div>
                    <div>
                        <hr style={{ backgroundColor: '#3F000F' }} />
                    </div>

                    {/*For  Completed Tasks */}


                    <div className="table-container" style={{ marginTop: '50px' }}>
                        <div className="mb-3 text-center p-2" style={{ backgroundColor: '#3F000F' }}>
                            <h4 style={{ color: 'white' }}>Completed Tasks</h4>
                        </div>
                        <table className="table text-center table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Task Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Created Date</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Actions</th> {/* Add a new column for actions */}
                                </tr>
                            </thead>
                            <tbody>
                                {CompletedTasks.map((task, index) => (

                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td> <i class="bi bi-check2-all" style={{ color: 'green', fontSize: '20px', marginRight: '10px' }}></i>{task.taskName}</td>
                                        <td>{task.description}</td>
                                        <td>{new Date(task.createdOn).toDateString()}</td>
                                        <td>{new Date(task.dueDate).toDateString()}</td>
                                        <td>
                                            {/* Button to delete task */}
                                            <button className='btn btn-danger' onClick={() => handleDelete(task._id)} >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            {
                                CompletedTasks.length === 0 && (
                                    <h4>No tasks found</h4>
                                )
                            }
                        </div>

                    </div>



                </div>
            </div>

        </div>
    );
};

export default MyTask;