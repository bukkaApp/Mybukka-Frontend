/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from 'Components/container/Container';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import getBukkasRelatedToSingleCuisines from '../actionCreators/getBukkasRelatedToSingleCuisines';
import getMoreBukkasRelatedToSingleCuisines from '../actionCreators/getMoreBukkasRelatedToSingleCuisines';

import SearchItems, { Headline } from '../common/SearchItems';
import { useLocationContext } from '../../../context/LocationContext';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';

// TODO: Don't  display time if bukkas are not avaailable or they have closed

import './searchresult.scss';

const FoodSection = ({
  search,
  fetchNearbyBukkas,
  cuisineItems,
  getBukkasRelatedToCuisines,
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState({
    by: '',
    value: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let suscribed = true;//eslint-disable-line
    getBukkasRelatedToCuisines('american', coordinates);
    return () => {
      suscribed = false;
    };
  }, [coordinates]);

  useEffect(() => {
    fetchNearbyBukkas(coordinates, 1, 100, searchQuery.by, searchQuery.value);
  }, [coordinates, searchQuery]);

  useEffect(() => {
    if (cuisineItems.length > 0 && searchQuery.value.length > 0) {
      const newSearchResult = cuisineItems.filter(bukka =>
        bukka[searchQuery.by].includes(searchQuery.value)
      );
      setSearchResults(newSearchResult);
    }
  }, [cuisineItems, searchQuery]);

  useEffect(() => {
    setSearchQuery({ by: 'name', value: search });
    push(`/search?by=name&value=${search}`);
  }, [search]);

  const handleChange = () => {};

  return (
    <div className="search-result-scene container-fluid p-0">
      <div>
        <IntroSection handleChange={handleChange} push={push} />
        <ExploreSection classNames="pt-5">
          <div className="mt-130 mb-4">
            {searchResults.length === 0 && <Headline title={searchQuery.value || 'Search'} />}
            {searchResults.length > 0 && (
              <Headline
                title={`${searchQuery.value}`}
                views={searchResults}
              />
            )}
            <Container classNames="px-0">
              {searchResults.length > 0 ? (
                <div className="col-md-3 col-lg-2">
                  <DeliveryOrPickupNav />
                </div>
              ) : (
                <h6 className="pl-3">EXPLORE TOP CUISINES</h6>
              )}
            </Container>
            {searchResults.length === 0 && searchQuery.value.length > 0 && (
              <h2 className="text-center" style={{ marginTop: '50px' }}>
                Your search returned no results
              </h2>
            )}
            <SearchItems searchResults={searchResults} />
          </div>
        </ExploreSection>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  searchAnythingReducer: { search },
  businessesReducer: { fetchedBukkas, status },
  businessGroupReducer: {
    cuisineItems, errorMessage,
    currentPage,
    cuisineToDisplay: { name },
  },
}) => ({
  search,
  fetchedBukkas,
  status,
  mode,
  cuisineItems,
  errorMessage,
  currentPage,
  cuisineToDisplay: { name },
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas,
    fetchBukkaMenu: fetchBukkaMenuAction,
    getBukkasRelatedToCuisines: getBukkasRelatedToSingleCuisines,
    getMoreBukkasRelatedToCuisines: getMoreBukkasRelatedToSingleCuisines, }
)(FoodSection);

FoodSection.propTypes = {
  search: PropTypes.string.isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
};

Headline.defaultProps = {
  views: 0
};

Headline.propTypes = {
  views: PropTypes.number,
  title: PropTypes.string.isRequired
};
