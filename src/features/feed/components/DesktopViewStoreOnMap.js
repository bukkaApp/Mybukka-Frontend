import React from 'react';

import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchBukkas from '../actionCreators/fetchBukkas';
import FoodNearBy from '../common/FoodNearBy';

import getPromotedBukkas from '../actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../actionCreators/getRestaurantCuisineAction';
import { useBusinessListContext } from '../../../context/BusinessListContext';
import BusinessList from '../../../components/business-list/BusinessList';

const DesktopViewStoreOnMap = ({
  errorMessage,
  displayMap,
  currentPage,
  fetchedBukkas: { nearbyBukkas },
}) => {
  const { store, setHoveredBusiness } = useBusinessListContext();
  const isLargeScreen = useMediaQuery({ minWidth: 767 });

  return (
    isLargeScreen &&
    <React.Fragment>
      <div className={displayMap ? 'Food-Nearby-Wrapper' : 'mt-5'}>
        <FoodNearBy
          delivery
          onMouseEnter={() => setHoveredBusiness(store)}
          onMouseLeave={() => setHoveredBusiness(null)}
          classNames={displayMap ? 'col-12' : 'col-xl-4 col-md-6 col-sm-12'}
          title={displayMap ? '' : 'Nearby'}
          bukkaData={nearbyBukkas}
          imageHeight={displayMap ? 'map-img-height' : 'img-height'}
          currentPage={currentPage}
          errorMessage={errorMessage}
        />
      </div>
      {displayMap && <BusinessList />}
    </React.Fragment>
  );
};

const mapStateToProps = ({
  businessesReducer: { fetchedBukkas, currentPage, errorMessage },
}) => ({
  fetchedBukkas,
  currentPage,
  errorMessage,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas,
    getPromoBukkas: getPromotedBukkas,
    getRestaurantCuisine: getRestaurantCuisineAction
  },
)(DesktopViewStoreOnMap);

DesktopViewStoreOnMap.propTypes = {
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
