/* eslint-disable react/prop-types */
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { LocationsPredictionProvider } from '../context/LocationsPrediction';
import { LocationProvider } from '../context/LocationContext';
import { DarkModeProvider } from '../context/DarkMode';
import { ThemeProvider } from '../context/ThemeProvider';
import { CloudinaryProvider } from '../components/img/Cloudinary';
import { ModalProvider } from '../context/ModalContext';
import { DropdownProvider } from '../context/DropdownContext';
import { CartProvider } from '../context/CartContext';
import { LoadingProvider } from '../context/LoadingContext';
import { MapProvider } from '../context/MapContext';
import { CookieProvider } from '../context/CookieContext';
import { ToastProvider } from '../context/ToastContext';
import { NotificationProvider } from '../context/NotificationContext';
import { LastLocationProvider } from '../context/LastLocationContext';
import { GlobalFormValidityRequestProvider } from '../context/GlobalFormValidityRequestContext';
import { GlobalFormValidityReportProvider } from '../context/GlobalFormValidityReportContext';

const Primary = ({ children }) => (
  <LocationsPredictionProvider>
    <LocationProvider>
      <CookieProvider> {/* cookie consent provider */}
        <CookiesProvider>
          <CloudinaryProvider>
            <DarkModeProvider>
              <ThemeProvider>
                <ModalProvider>
                  <DropdownProvider>
                    <CartProvider>
                      <MapProvider>
                        <ToastProvider>
                          <NotificationProvider>
                            <GlobalFormValidityRequestProvider>
                              <GlobalFormValidityReportProvider>
                                <LastLocationProvider>
                                  <LoadingProvider>
                                    {children}
                                  </LoadingProvider>
                                </LastLocationProvider>
                              </GlobalFormValidityReportProvider>
                            </GlobalFormValidityRequestProvider>
                          </NotificationProvider>
                        </ToastProvider>
                      </MapProvider>
                    </CartProvider>
                  </DropdownProvider>
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
