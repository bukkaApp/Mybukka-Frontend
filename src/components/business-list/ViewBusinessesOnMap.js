import React, { lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';

const ViewBusinessesOnMapSmallScreen = lazy(() => import('./ViewBusinessesOnMapSmallScreen'));
const ViewBusinessesOnMapLargeScreen = lazy(() => import('./ViewBusinessesOnMapLargeScreen'));

const ViewBusinessesOnMap = () => {
  const isBigScreen = useMediaQuery({ minWidth: 992 });

  return (
    <Suspense fallback={<div>loading ...</div>}>
      {isBigScreen ?
        <ViewBusinessesOnMapLargeScreen />
        : <ViewBusinessesOnMapSmallScreen />}
    </Suspense>
  );
};

export default ViewBusinessesOnMap;
