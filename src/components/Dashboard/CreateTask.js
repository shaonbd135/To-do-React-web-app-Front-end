import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import DashNav from './DashNav';
import 'react-calendar/dist/Calendar.css';
import { ProfileContext } from '../../routes/RoutesIndex';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateTask = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(ProfileContext);
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [task, setTask] = useState({
        title: '',
        description: '',
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');


    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(new Date(date).toDateString());
    }

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        e.preventDefault();
        axios.post('http://localhost:5000/create-task', {
            username: user.username,
            taskName: task.title,
            description: task.description,
            dueDate: selectedDate
        }, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setSuccess(res.data.message);
                    setTimeout(() => { // Set timeout for success message
                        setSuccess('');
                    }, 10000); // 10 seconds
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
                setTimeout(() => { // Set timeout for error message
                    setError('');
                }, 10000); // 10 seconds

            })
    }

    const today = new Date().toDateString();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 " style={{ backgroundColor: '#3F000F', width: '230px', height: '100vh' }}>
                    <DashNav></DashNav>
                </div>

                <div className="col-md-10">
                    <h3 className='mt-5 mb-5 text-center p-3' style={{ color: 'green', fontSize: '30px', marginBottom: '30px', borderBottom: '2px solid lightgray', }}>Create Your Daily Task {user.name} </h3>
                    <div className="row">
                        <div className="col-md-5 mt-5  p-5 m-auto ">
                            <div className="mb-3 text-center" style={{ fontSize: '20px', backgroundColor: 'white', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)', padding: '10px' }}>
                                <h5>Today is - <span style={{ color: 'green', fontWeight: 'bold' }}>{today}</span></h5>
                            </div>
                            <div className="mb-3 text-center d-flex justify-content-center">
                                <Calendar onChange={setSelectedDate} value={selectedDate} />

                            </div>
                        </div>
                        <div className="col-md-5 rounded " style={{ boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)' }}>
                            <div className="mt-5 p-5 m-auto" >
                                <form action="/create-task" method="post" onSubmit={handleSubmit}  >
                                    <div className='mb-3 text-center  '>
                                        {success && <p className='alert alert-success '>{success}</p>}
                                        {error && <p className='alert alert-danger'>{error}</p>}
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Task</label>
                                        <input type="text" name='taskName' class="form-control" id="exampleFormControlInput1" required placeholder="Task Name" onChange={(e) => setTask({ ...task, title: e.target.value })} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <textarea name='taskDescription' class="form-control" rows="3" required onChange={(e) => setTask({ ...task, description: e.target.value })} ></textarea>
                                    </div>
                                    <div>
                                        <label for="exampleFormControlInput1" class="form-label">Deadline</label>
                                        <input type="date" name='deadline' class="form-control" required id="exampleFormControlInput1" onChange={handleDateChange} />
                                    </div>
                                    <button type='submit' className='btn btn-success mt-3'>Submit</button>

                                </form>

                            </div>

                        </div>
                        <div className="col-md-2">

                        </div>

                    </div>

                </div>
            </div>


        </div>
    );
};

export default CreateTask;