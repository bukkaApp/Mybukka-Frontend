import React from 'react';
import PropTypes from 'prop-types';
import ProfileHeader from './components/ProfileScene';

const Profile = ({ history }) => {
  return <ProfileHeader history={history} />;
};

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
