/* eslint-disable react/prop-types */
import React from 'react';
import { UserProvider } from '../context/UserContext';

const Secondary = ({ children }) => (
  <UserProvider>
    {children}
  </UserProvider>
);

export default Secondary;
