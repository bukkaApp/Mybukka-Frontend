import React, { useEffect } from 'react';
import UserDropdown from './UserDropdown';
import '../navbar.scss';
import useClickOutside from '../../../hooks/useClickOutside';
import { useUserContext } from '../../../context/UserContext';
import { useDropdownContext } from '../../../context/DropdownContext';

const UserDefaultImage = () => {
  const { user } = useUserContext();
  const wrapperRef = React.useRef(null);
  const { setUserOptions, userOptions } = useDropdownContext();

  useEffect(() => {
    setUserOptions(false);
    return () => setUserOptions(false);
  }, []);

  useClickOutside(() => setUserOptions(false), wrapperRef);

  return (
    <div ref={wrapperRef} className="user-default-img">
      <div className="position-relative">
        <button className="auth-btn-drop" onClick={() => setUserOptions(true)}>
          <img
            src={(user && user.imageUrl) || 'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png'}
            alt="user-img"
          />
        </button>
        {userOptions && <UserDropdown />}
      </div>
    </div>
  );
};

export default UserDefaultImage;

UserDefaultImage.defaultProps = {};

UserDefaultImage.propTypes = {};
