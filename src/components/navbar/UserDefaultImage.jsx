import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDropdown from './UserDropdown';
import './navbar.scss';

const UserDefaultImage = ({ userInfo: { imageUrl } }) => {
  const [dropdown, toggleDropdown] = useState(false);
  return (
    <div className="user-default-img">
      <div className="position-relative">
        <button
          className="auth-btn-drop"
          onClick={() => toggleDropdown(!dropdown)}
        >
          <img
            src={
              imageUrl === undefined
                ? 'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png'
                : `${imageUrl}`
            }
            alt="authenticated-img"
          />
        </button>
        {dropdown && <UserDropdown />}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  fetchUserData: {
    userInfo: { userInfo },
  },
}) => ({
  userInfo,
});

export default connect(
  mapStateToProps,
  {},
)(UserDefaultImage);

UserDefaultImage.defaultProps = {
  userInfo: {
    imageUrl:
      'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png',
  },
};

UserDefaultImage.propTypes = {
  userInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};
