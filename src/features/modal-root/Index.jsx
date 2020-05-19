import React from 'react';
import { useHistory } from 'react-router-dom';

import InviteFriends from '../invite/InviteFriends';

export const Index = () => {
  const { push } = useHistory();
  return (
    <>
      <InviteFriends push={push} />
    </>
  );
};

export default Index;
