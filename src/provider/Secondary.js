/* eslint-disable react/prop-types */
import React from 'react';
import { UserProvider } from '../context/UserContext';
import { AddressProvider } from '../context/AddressContext';
import { BusinessListProvider } from '../context/BusinessListContext';
import { BusinessesProvider } from '../context/BusinessesContext';

const Secondary = ({ children }) => (
  <UserProvider>
    <AddressProvider>
      <BusinessesProvider>
        <BusinessListProvider>
          {children}
        </BusinessListProvider>
      </BusinessesProvider>
    </AddressProvider>
  </UserProvider>
);

export default Secondary;
