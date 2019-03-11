import React from 'react';

import PropTypes from 'prop-types';
import ProfileHeaderTitle from '../common/ProfileHeaderTitle';

import './profileheader.scss';

const ProfileHeader = ({ firstName, lastName }) => (
  <div className="profile-header-section d-none d-lg-block capitalize">
    <ProfileHeaderTitle firstName={firstName} lastName={lastName} />
  </div>
);

export default ProfileHeader;

ProfileHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};
