/* eslint-disable react/prop-types */
import React from 'react';
import { UserProvider } from '../context/UserContext';
import { BusinessListProvider } from '../context/BusinessListContext';
import { BusinessesProvider } from '../context/BusinessesContext';
import { BusinessProvider } from '../context/BusinessContext';
import { ImagesProvider } from '../context/ImagesContext';

const Secondary = ({ children }) => (
  <UserProvider>
    <BusinessesProvider>
      <BusinessProvider>
        <BusinessListProvider>
          <ImagesProvider>
            {children}
          </ImagesProvider>
        </BusinessListProvider>
      </BusinessProvider>
    </BusinessesProvider>
  </UserProvider>
);

export default Secondary;
