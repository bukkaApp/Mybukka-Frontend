import React from 'react';
import NavLink from '../navlink/Navlink';
import './navbar.scss';

const UserDefaultImage = () => (
  <NavLink classNames="no-classname" href="/profile">
    <div className="user-default-img">
      <img src="https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png" alt="authenticated-img" />
    </div>
  </NavLink>

);

export default UserDefaultImage;
