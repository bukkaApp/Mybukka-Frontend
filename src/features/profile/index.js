import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalRoot from '../modal-root/Index';
import ProfileHeader from './components/ProfileScene';

const Profile = ({ history }) => {
  const { push } = history;
  return (<Fragment>
    <ModalRoot push={push} />
    <ProfileHeader history={history} />
  </Fragment>);
};

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
