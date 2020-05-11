import React from 'react';
import { useHistory } from 'react-router-dom';

import AuthModal from 'Components/navbar/common/AuthModal';
import InviteFriends from '../invite/InviteFriends';

export const Index = () => {
  const { push } = useHistory();
  return (
    <>
      <AuthModal push={push} />
      <InviteFriends push={push} />
    </>
  );
};

export default Index;
