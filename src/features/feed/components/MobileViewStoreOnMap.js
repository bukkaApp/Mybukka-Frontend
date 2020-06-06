import React from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Map from 'Components/map';
import Carousel from 'Components/Carousel/Carousel';
import './FoodSection.scss';

const MobileViewStoreOnMap = ({
  fetchedBukkas: { nearbyBukkas },
  displayMap,
}) => {
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });

  return (
    (isMobileScreen && displayMap) && (
      <React.Fragment>
        <Map useBusinesses />
        <Carousel delivery noOfImagesShown={3} xl={3} lg={2} md={2} sm={1} slideItems={nearbyBukkas} imageHeight="img-fluid" classNames="col-lg-6 col-md-6 col-sm-12 col-12" />
      </React.Fragment>
    ));
};

const mapStateToProps = ({
  businessesReducer: { fetchedBukkas },
}) => ({
  fetchedBukkas,
});

export default connect(mapStateToProps)(MobileViewStoreOnMap);

MobileViewStoreOnMap.propTypes = {};
