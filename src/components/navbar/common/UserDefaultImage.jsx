import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import '../navbar.scss';
import useClickOutside from '../../../hooks/useClickOutside';
import { useUserContext } from '../../../context/UserContext';

const UserDefaultImage = () => {
  const { push } = useHistory();
  const { user } = useUserContext();
  const wrapperRef = React.useRef(null);
  const [dropdown, toggleDropdown] = useState(false);

  useClickOutside(() => toggleDropdown(false), wrapperRef);

  return (
    <div ref={wrapperRef} className="user-default-img">
      <div className="position-relative">
        <button
          className="auth-btn-drop"
          onClick={() => toggleDropdown(!dropdown)}
        >
          <img
            src={user.imageUrl || 'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png'}
            alt="user-img"
          />
        </button>
        {dropdown && <UserDropdown
          push={push}
          handleToggle={() => toggleDropdown(false)}
        />
        }
      </div>
    </div>
  );
};

export default UserDefaultImage;

UserDefaultImage.defaultProps = {};

UserDefaultImage.propTypes = {};
