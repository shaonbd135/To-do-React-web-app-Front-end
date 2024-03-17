import React from 'react';
import NavBar from '../NavBar/NavBar';
import Main from '../Main/Main';
import Features from '../Features/Features';

const Header = () => {
    return (
        <div className='container-fluid'>
            <NavBar></NavBar>
            <div style={{ backgroundColor: 'lightgray' }}>
                <Main></Main>
            </div>
            <Features></Features>

        </div>
    );
};

export default Header;