import React from 'react';
import Brand from 'Components/brand/Brand';
import UserIcon from 'Components/icons/User';
import './primaryNavbar.scss';

const AuthenticaticatedNavbar = () => (
    <div className="container">
        <nav className="navbar navbar-light">
            <Brand />
            <div className="form-inline">
                <UserIcon />
            </div>
        </nav>
    </div>
);

export default AuthenticaticatedNavbar;