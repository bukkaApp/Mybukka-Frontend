import React from 'react';

import { useMediaQuery } from 'react-responsive';
import BusinessMapList from '../../../components/business-list/BusinessMapList';
import BusinessList from '../../../components/business-list/BusinessList';

const DesktopViewStoreOnMap = ({ displayMap }) => {
  const isLargeScreen = useMediaQuery({ minWidth: 767 });

  return (
    isLargeScreen &&
    <React.Fragment>
      {displayMap ?
        <BusinessMapList />
        : <BusinessList />}
    </React.Fragment>
  );
};


export default DesktopViewStoreOnMap;

DesktopViewStoreOnMap.propTypes = {};
