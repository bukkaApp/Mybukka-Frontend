/* eslint-disable react/prop-types */
import React from 'react';
import { LocationsPredictionProvider } from '../context/useLocationsPrediction';
import { LocationProvider } from '../context/LocationContext';


const ContextProviders = ({ children }) => (
  <LocationsPredictionProvider>
    <LocationProvider>
      {children}
    </LocationProvider>
  </LocationsPredictionProvider>
);

export default ContextProviders;
