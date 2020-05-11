import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from 'Components/container/Container';
import Navbar from 'Components/navbar';
import NotAvailable from 'Components/not-found/NotAvailable';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';
import NearByBukka from '../common/NearByBukka';
import { useLocationContext } from '../../../context/LocationContext';

// TODO: Don't  display time if bukkas are not avaailable or they have closed

const Favorites = ({
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  status: { error }
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  useEffect(() => {
    fetchNearbyBukkas(coordinates);
  }, [coordinates]);

  if (nearbyBukkas.length === 0 && error) {
    return (
      <div>
        <Navbar push={push} />
        <NotAvailable />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {nearbyBukkas.length >= 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection classNames="pt-5">
            <Container classNames="position-sticky top-114">
              <h2 className="place-group-header pt-100 px-15 capitalize pb-3">
                Your Favorites
              </h2>
            </Container>
            <div className="border-top" />
            <Container classNames="position-relative bg-white">
              <NearByBukka
                classNames="col-xl-4 col-md-6 col-sm-12"
                heading={false}
                bukkaData={nearbyBukkas}
                imageHeight="img-fluid"
              />
            </Container>
          </ExploreSection>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  businessesReducer: { fetchedBukkas, status },
}) => ({
  fetchedBukkas,
  status,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas }
)(Favorites);

Favorites.propTypes = {
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
