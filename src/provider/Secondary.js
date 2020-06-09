/* eslint-disable react/prop-types */
import React from 'react';
import { UserProvider } from '../context/UserContext';
import { AddressProvider } from '../context/AddressContext';
import { BusinessListProvider } from '../context/BusinessListContext';
import { BusinessesProvider } from '../context/BusinessesContext';
import { BusinessProvider } from '../context/BusinessContext';

const Secondary = ({ children }) => (
  <UserProvider>
    <AddressProvider>
      <BusinessesProvider>
        <BusinessProvider>
          <BusinessListProvider>
            {children}
          </BusinessListProvider>
        </BusinessProvider>
      </BusinessesProvider>
    </AddressProvider>
  </UserProvider>
);

export default Secondary;
