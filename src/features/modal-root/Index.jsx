import React from 'react';

import PropTypes from 'prop-types';

import AuthModal from 'Components/navbar/common/AuthModal';
import InviteFriends from '../invite/InviteFriends';

const Index = ({ push }) => (
  <>
    <AuthModal push={push} />
    <InviteFriends push={push} />
  </>
);

export default Index;

Index.propTypes = {
  push: PropTypes.func.isRequired,
};
