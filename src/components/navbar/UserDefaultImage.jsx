import React, { useState } from 'react';
import UserDropdown from './UserDropdown';
import './navbar.scss';

const UserDefaultImage = () => {
  const [dropdown, toggleDropdown] = useState(false);
  return (
    <div className="user-default-img">
      <div className="position-relative">
        <button
          className="auth-btn-drop"
          onClick={() => toggleDropdown(!dropdown)}
        >
          <img
            src="https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png" // eslint-disable-line
            alt="authenticated-img"
          />
        </button>
        {dropdown && <UserDropdown />}
      </div>
    </div>
  );
};
export default UserDefaultImage;
