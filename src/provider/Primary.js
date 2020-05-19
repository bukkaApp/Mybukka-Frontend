/* eslint-disable react/prop-types */
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { LocationsPredictionProvider } from '../context/LocationsPrediction';
import { LocationProvider } from '../context/LocationContext';
import { DarkModeProvider } from '../context/DarkMode';
import { ThemeProvider } from '../context/ThemeProvider';
import { CloudinaryProvider } from '../components/img/Cloudinary';
import { ModalProvider } from '../context/UseModal';
import { CartProvider } from '../context/CartContext';
import { LoadingProvider } from '../context/UseLoading';
import { MapProvider } from '../context/UseMap';
import { CookieProvider } from '../context/UseCookie';

const Primary = ({ children }) => (
  <LocationsPredictionProvider>
    <LocationProvider>
      <CookieProvider> {/* cookie consent provider */}
        <CookiesProvider>
          <CloudinaryProvider>
            <DarkModeProvider>
              <ThemeProvider>
                <ModalProvider>
                  <CartProvider>
                    <LoadingProvider>
                      <MapProvider>
                        {children}
                      </MapProvider>
                    </LoadingProvider>
                  </CartProvider>
                </ModalProvider>
              </ThemeProvider>
            </DarkModeProvider>
          </CloudinaryProvider>
        </CookiesProvider>
      </CookieProvider>
    </LocationProvider>
  </LocationsPredictionProvider>
);

export default Primary;
