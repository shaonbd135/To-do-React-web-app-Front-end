import React, { useContext, useEffect, useState } from 'react';
import DashNav from './DashNav';
import { ProfileContext } from '../../routes/RoutesIndex';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyTask.css';
import MyModal from './modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyTask = () => {
    const navigate = useNavigate();

    const [user, setUser] = useContext(ProfileContext);
    const [taskList, setTaskList] = useState([]); // For Todo Tasks
    const [CompletedTasks, setCompletedTasks] = useState([]); // For Completed Tasks
    const [updateSuccess, setUpdateSuccess] = useState(''); // For Update Success
    const [error, setError] = useState(''); // For Error
    const [deleteSuccess, setDeleteSuccess] = useState(''); // For Delete

    // Get All Tasks From Server for Display........
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('https://to-do-react-web-app-back-end-server.onrender.com/tasks', {
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

    // Delete Task........
    const handleDelete = (taskId) => {
        const token = localStorage.getItem('token');
        axios.delete(`https://to-do-react-web-app-back-end-server.onrender.com/delete-task/${taskId}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setDeleteSuccess(res.data.message);
                    toast.success(res.data.message, {
                        position: "bottom-right",
                      });
                    setTimeout(() => {
                        setDeleteSuccess('');
                    }, 7000);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
                toast.error(err.response.data.message , {
                    position: "bottom-right",
                  });
                setTimeout(() => {
                    setError('');
                }, 7000);
            });
    }

    // Update Task Status For Completed...
    const handleComplete = (taskId) => {
        const token = localStorage.getItem('token');
        axios.patch('https://to-do-react-web-app-back-end-server.onrender.com/update-task', {
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
                    toast.success(res.data.message , {
                        position: "bottom-right",
                      });
                    setTimeout(() => {
                        setUpdateSuccess('');
                    }, 5000);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
                toast.error(err.response.data.message , {
                    position: "bottom-right",
                  });
                setTimeout(() => {
                    setError('');
                }, 5000);
            });
    }

    // Modal For Edit Task
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // Send data to Modal For Edit 
    const [editData, setEditData] = useState({});


    const handleEdit = (data) => {
        setEditData(data);
        onOpenModal();
    }

    // Update Success Message For Edit Task From Modal
    const successUpdate = (message) => {
        setUpdateSuccess(message);
        setTimeout(() => {
            setUpdateSuccess('');
        }, 5000);
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-auto " >
                    <DashNav></DashNav>
                </div>
                <div className="col-md-10 col-sm-9 text-center mt-2   mx-auto m-auto" >
                    <h5 className=' mb-5 text-center  text-muted p-3' style={{  fontSize: '25px', marginBottom: '30px', borderBottom: '2px solid lightgray', }}>My Task List </h5>

                    {/* Show the success message or error message  */}

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

                        {/* Table for My Task */}
                        <div className="mb-3 text-center p-2 " style={{ backgroundColor: '#3F000F' }}>
                            <h4 style={{ color: 'white' }}> <i class="bi bi-card-list" style={{ color: 'white', fontSize: '25px', marginRight: '10px' }}></i>To Do Tasks</h4>
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
                                            <button className='btn btn-success m-2 ' onClick={() => handleComplete(task._id)} > <i class="bi bi-check2-all" style={{ color: 'white', fontSize: '15px', marginRight: '10px' }}></i>Mark as Done</button>
                                            {/* Button to edit task */}
                                            <button className='btn btn-primary m-2' onClick={() => handleEdit(task)}  > <i class="bi bi-pencil-square" style={{ color: 'white', fontSize: '15px', marginRight: '10px' }}></i>Edit</button>
                                            {/* Button to delete task */}
                                            <button className='btn btn-danger' onClick={() => handleDelete(task._id)}  ><i class="bi bi-trash" style={{ color: 'white', fontSize: '15px', marginRight: '10px' }}></i>Delete</button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <ToastContainer autoClose={4000} />

                        {/* //modal for edit task (Popup) */}
                        <div>
                            <MyModal open={open} onCloseModal={onCloseModal} editData={editData} successUpdate={successUpdate} />
                        </div>


                        {/* If no tasks found for the user (Due Task) */}
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

                    {/*Table For Completed Tasks */}

                    <div className="table-container" style={{ marginTop: '50px' }}>
                        <div className="mb-3 text-center p-2" style={{ backgroundColor: '#3F000F' }}>
                            <h4 style={{ color: 'white' }}> <i class="bi bi-check2-all" style={{ color: 'white', fontSize: '25px', marginRight: '10px' }}></i>Completed Tasks</h4>
                        </div>
                        <table className="table text-center table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Task Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Created Date</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Actions</th>
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
                                            <button className='btn btn-danger' onClick={() => handleDelete(task._id)} > <i class="bi bi-trash" style={{ color: 'white', fontSize: '15px', marginRight: '10px' }}></i>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            {/* If no tasks found for the user (Completed Tasks) */}
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