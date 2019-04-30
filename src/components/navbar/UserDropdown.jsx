import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import signOut from './actionCreators/signOut';
import './userdropdown.scss';

const UserDropdown = ({ logoutUser }) => {
  const handleClick = (e) => {
    e.preventDefault();
    return logoutUser();
  };
  return (
    <div className="user-dropdown-container">
      <div role="menu" tabIndex="0" className="user-dropdown-content">
        <div className="custom-user-dropdown">
          <a
            className="custom-user-dropdown-item"
            data-event-category="Navigation"
            data-event-action="User Dropdown"
            data-event-label="Orders"
            href="/history"
          >
            <div className="user-dropdown-item-content">
              <span className="custom-user-dropdown-text">
                <span>Order History</span>
              </span>
            </div>
          </a>
        </div>
        <div className="custom-user-dropdown">
          <a
            className="custom-user-dropdown-item"
            data-event-category="Navigation"
            data-event-action="User Dropdown"
            data-event-label="Favorites"
            href="/favorites"
          >
            <div className="user-dropdown-item-content">
              <span className="custom-user-dropdown-text">
                <span>Your Favorites</span>
              </span>
              <svg width="17" height="16" className="css-1scam7m e1diztvq4">
                <path d="M8.533 11.69l3.41 1.767-.65-3.74 2.734-2.627-3.78-.541-1.714-3.422L6.82 6.55l-3.78.541 2.734 2.628-.651 3.74 3.41-1.768zm0 1.577L3.26 16l1.008-5.789L0 6.111l5.896-.844L8.533 0l2.637 5.267 5.897.844-4.267 4.1L13.807 16l-5.274-2.733z" fill="#2D3138" /> {/* eslint-disable-line */}
              </svg>
            </div>
          </a>
        </div>
        <div className="custom-user-dropdown">
          <a
            className="custom-user-dropdown-item"
            data-event-category="Navigation"
            data-event-action="User Dropdown"
            data-event-label="Account"
            href="/profile"
          >
            <div className="user-dropdown-item-content">
              <span className="custom-user-dropdown-text">
                <span>Account Settings</span>
              </span>
            </div>
          </a>
        </div>
        <div className="custom-user-dropdown">
          <a
            className="custom-user-dropdown-item"
            href="/support/buyer"
            data-event-category="Navigation"
            data-event-action="User Dropdown"
            data-event-label="Help Center"
          >
            <div className="user-dropdown-item-content">
              <span className="custom-user-dropdown-text">
                <span>Help Center</span>
              </span>
            </div>
          </a>
        </div>
        <div className="custom-user-dropdown">
          <button type="button" className="custom-user-dropdown-item">
            <div className="user-dropdown-item-content">
              <span
                data-event-category="Navigation"
                data-event-action="User Dropdown"
                data-event-label="Invite Friends"
                className="custom-user-dropdown-text"
              >
                <span>Invite Friends</span>
              </span>
            </div>
          </button>
        </div>
        <div className="custom-user-dropdown">
          <button
            onClick={handleClick}
            type="button"
            className="custom-user-dropdown-item"
          >
            <div className="user-dropdown-item-content">
              <span
                data-event-category="Navigation"
                data-event-action="User Dropdown"
                data-event-label="Logout"
                className="custom-user-dropdown-text"
              >
                <span>Sign Out</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  logoutUser: signOut
})(UserDropdown);

UserDropdown.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
