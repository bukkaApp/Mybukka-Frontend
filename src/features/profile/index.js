import React from 'react';
import PropTypes from 'prop-types';
import ProfileScene from './components/ProfileScene';

const Profile = ({ history }) => <ProfileScene history={history} />;

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
