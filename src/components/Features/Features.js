import React from 'react';

const Features = () => {
    return (
        <div className='container text-center mt-5'>
            <div className='p-1 text-center rounded' style={{ backgroundColor: 'black' }}>
            <i style={{ color: 'white', fontSize: '30px' }} class="bi bi-clipboard2-check"></i>
                <h3 style={{ color: 'white' }} className='mb-3'>Features</h3>
            </div>
            <div className='row d-flex justify-content-center mt-5'>
                <div className='col-md-4 mb-3'>
                    <i style={{ color: '#0D6EFD', fontSize: '50px' }} class="bi bi-receipt"></i>
                    <h4 className='mb-3'>Task Manager</h4>
                    <small>Take control of your day with our task manager app. Easily add, edit, and delete tasks, set deadlines, and mark tasks as completed to streamline your workflow</small>
                </div>
                <div className='col-md-4 mb-3'>
                    <i style={{ color: '#0D6EFD', fontSize: '50px' }} class="bi bi-person-workspace"></i>
                    <h4 className='mb-3'>Personal Organizer</h4>
                    <small>Stay on top of your tasks and deadlines with our personal organizer app. Keep all your tasks in one place, categorize them into lists or projects, and customize your workflow to fit your needs</small>
                </div>
                <div className='col-md-4 mb-3'>
                    <i style={{ color: '#0D6EFD', fontSize: '50px' }} class="bi bi-window-plus"></i>
                    <h4 className='mb-3'>Productivity Assistant</h4>
                    <small>Boost your productivity with our productivity assistant app. Stay focused and organized by managing your tasks efficiently Set reminders, categorize tasks, and track your progress effortlessly</small>
                </div>
            </div>

        </div>
    );
};

export default Features;