import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';

const MyModal = ({ open, onCloseModal, editData, successUpdate }) => {

    const [newData, setNewData] = useState({});

    const handleDateChange = (e) => {
        const date = e.target.value;
        setNewData({
            ...newData,
            dueDate: new Date(date).toDateString()
        })
    }

    const setData = (e) => {
        const { name, value } = e.target;
        setNewData(prevData => ({
            ...prevData,
            [name]: value,
            id: editData._id
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            axios.patch('http://localhost:5000/edit-task', {
                id: newData.id,
                taskName: newData.taskName,
                description: newData.taskDescription,
                dueDate: newData.dueDate
            }, {
                headers: {
                    Authorization: token,
                }
            })
                .then((res) => {
                    if (res.data.success === true) {
                        successUpdate(res.data.message);
                        setNewData({});
                        onCloseModal();
                    }
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    onCloseModal();
                });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <div style={{ padding: '20px' }}>
                    <h5 className='text-center mt-3 mb-3 text-muted'>Edit Your Task Details </h5>
                    <form action="/edit-task" method="post" onSubmit={handleSubmit} style={{ width: '400px' }}  >
                        <div className="mb-3">
                            <label className="form-label">Task Name</label>
                            <input type="text" name='taskName' className="form-control" required placeholder="Task Name" defaultValue={editData.taskName} onChange={setData} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name='taskDescription' className="form-control" rows="3" placeholder="Description" defaultValue={editData.description} required onChange={setData} ></textarea>
                        </div>
                        <div>
                            <label className="form-label">Deadline</label>
                            <input type="date" name='deadline' className="form-control" onChange={handleDateChange} />
                        </div>
                        <button type='submit' className='btn btn-success mt-3' > <i class="bi bi-file-plus" style={{ color: 'white', fontSize: '15px', marginRight: '10px' }}></i>Update</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default MyModal;
