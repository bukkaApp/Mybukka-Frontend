/* eslint-disable react/prop-types */
import React from 'react';
import { UserProvider } from '../context/UserContext';
import { AddressProvider } from '../context/AddressContext';

const Secondary = ({ children }) => (
  <UserProvider>
    <AddressProvider>
      {children}
    </AddressProvider>
  </UserProvider>
);

export default Secondary;
