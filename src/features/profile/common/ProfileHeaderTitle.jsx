import React from 'react';

import PropTypes from 'prop-types';

import Container from 'Components/container';

const ProfileHeaderTitle = ({ firstName, lastName }) => (
  <Container classNames="profile-header">
    <h1 className="profile-header-title">
      {firstName} {lastName}
    </h1>
  </Container>
);

export default ProfileHeaderTitle;

ProfileHeaderTitle.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};
