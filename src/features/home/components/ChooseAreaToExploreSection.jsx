import React from 'react';

import { connect } from 'react-redux';

import setSelectedLocation from 'Redux/setSelectedLocation';

import { GoogleApiWrapper } from 'google-maps-react';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import Navlink from 'Components/navlink/Navlink';

import fetchBukkas from '../../feed/actionCreators/fetchBukkas';

import './chooseAreaToExplore.scss';

const mockAreas = [
  { href: '/', text: 'Wilmer Street Ilupeju', id: '1' },
  { href: '/', text: 'Lekki Phase 1', id: '1' },
  { href: '/', text: 'Ikeja lagos', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Fadeyi Yaba', id: '1' },
  { href: '/', text: 'Ojuelegba Lagos', id: '1' },
  { href: '/', text: 'Lekki Phase 2', id: '1' },
  { href: '/', text: 'Ajah Lagos', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' }
];

const AreasToExploreList = ({ areas, handleClick }) => (
  <div className="area-to-explore-list">
    <div className="row">
      {areas.map(area => (
        <div
          onClick={() => handleClick(area.text)}
          role="button"
          tabIndex="0"
          aria-pressed="false"
          className="col col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 list-section"
          key={shortId.generate()}
        >
          <Navlink
            href={area.href}
            text={area.text}
            key={area.id}
            classNames="area-link"
          />
        </div>
      ))}
    </div>
  </div>
);

const AreaToExploreHeader = () => (
  <div className="area-explore-header">
    <div className="row">
      <div className="col col-9">
        <h4 className="title">Choose an area to explore</h4>
      </div>
      <div className="col col-3 view-all-section">
        <Navlink href="/" text="View All" classNames="nav-link-view" />
      </div>
    </div>
  </div>
);

const ChooseAreaToExploreSection =
({ push, google, fetchNearbyBukkas, selectLocation }) => {
  const geoCodeLocation = (suggestion) => {
    const placeId = suggestion.place_id;
    const GeoCoder = new google.maps.Geocoder();
    GeoCoder.geocode({ placeId }, (response) => {
      const lattitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      const coordinates = [longitude, lattitude];
      selectLocation({ coordinates, suggestion });
      fetchNearbyBukkas(coordinates, push);
    });
  };

  const handlePredictions = (suggestions) => {
    if (suggestions.length > 0) {
      geoCodeLocation(suggestions[0]);
    }
  };

  const handleSuggestion = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    handlePredictions(predictions);
  };

  const handleSelectedLocation = (text) => {
    if (text) {
      const autoCompleteService = new google.maps.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input: text },
        handleSuggestion
      );
    }
  };

  const handleAreaToExploreClick = (text) => {
    handleSelectedLocation(text);
  };

  return (
    <div className="container choose-area-section">
      <AreaToExploreHeader />
      <AreasToExploreList
        handleClick={handleAreaToExploreClick}
        areas={mockAreas}
      />
    </div>
  );
};

export default connect(
  () => ({}),
  {
    selectLocation: setSelectedLocation,
    fetchNearbyBukkas: fetchBukkas
  }
)(
  GoogleApiWrapper({
    apiKey: process.env.GOOGLE_API_KEY,
    v: '3'
  })(ChooseAreaToExploreSection)
);

AreasToExploreList.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  handleClick: PropTypes.func.isRequired,
};


ChooseAreaToExploreSection.propTypes = {
  fetchNearbyBukkas: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  google: PropTypes.shape({}).isRequired,
  selectedLocation: PropTypes.shape({}).isRequired,
  selectLocation: PropTypes.func.isRequired,
};
