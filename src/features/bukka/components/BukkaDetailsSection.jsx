import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'Components/button/Button';
import ButtonGroup from 'Components/button/ButtonGroup';
import Container from 'Components/container/Container';
import Clock from 'Icons/Clock';
import ChevronVertical from 'Icons/ChevronVertical';
import Star from 'Icons/Star';
import MapMarkerAlt from 'Icons/MapMarkerAlt';
import BusinessAddress from '../../../components/business-address';

import './bukkaDetailsSection.scss';

const style = { paddingBottom: '15px' };

const DeliveryPriceAndtag = ({ deliveryPrice, deliveryMode }) => (
  <div className="delivery-price-tag">
    <div
      className={`row ${
        deliveryMode === 'pickup' ? 'justify-content-end' : 'justify-content-between'
      }`}
    >
      {deliveryMode === 'pickup' ? null : (
        <div className="col col-7">
          <p className="delivery-price">₦{deliveryPrice} DELIVERY</p>
        </div>
      )}
      <div className="px-3 d-inline-block">
        <div className="tag-bukka" style={style}>
          <Button
            classNames="tag-bukka-button px-3"
            text="AFRICAN"
            handleClick={() => {}}
            type="button"
          />
        </div>
      </div>
    </div>
  </div>
);

const ActionButtons = ({ deliveryTime, address, handleClick }) => (
  <div className="action-buttons-section">
    <ButtonGroup>
      <Button
        classNames="small-outline-button"
        handleClick={handleClick}
        type="button"
      >
        <p className="action-button-text">
          <Clock /> <span className="bukka-action-text-span">{deliveryTime} MIN</span>
        </p>
      </Button>
      <Button
        classNames="small-outline-button"
        handleClick={handleClick}
        type="button"
      >
        <p className="action-button-text">
          <MapMarkerAlt /> <span className="bukka-action-text-span">{address}</span>
        </p>
      </Button>
      <Button
        classNames="small-outline-button"
        handleClick={handleClick}
        type="button"
      >
        <p className="action-button-text">
          <span className="bukka-action-text-last-span">MORE INFO </span><ChevronVertical />
        </p>
      </Button>
    </ButtonGroup>
  </div>
);

const TitleAndDescription = ({ name, description }) => (
  <div className="bukka-details-title">
    <h1 className="bukka-title">{name}</h1>
    <div className="rating-details">
      <p className="bukka-rating-text">
        <Star /> 107 persons rated
      </p>
    </div>
    <p className="bukka-description">{description}</p>
  </div>
);

const BukkaDetailsSection = ({
  fetchedBukka,
  deliveryMode
}) => {
  const [state, setState] = useState(false);

  const { name, description, deliveryPrice, schedule, location, address } = fetchedBukka;
  if (Object.keys(fetchedBukka).length <= 0) {
    return null;
  }

  return (
    <Container classNames="bukka-details-section">
      <DeliveryPriceAndtag deliveryPrice={deliveryPrice || 30} deliveryMode={deliveryMode} />
      <TitleAndDescription name={name} description={description} />
      <ActionButtons handleClick={() => setState(prev => !prev)} deliveryTime={'15'} address={address} />
      <BusinessAddress location={location} show={state} schedule={schedule} />
    </Container>
  );
};

const mapStateToProps = ({
  businessReducer: {
    fetchedBukka
  },
  deliveryModeReducer: { mode: deliveryMode }
}) => ({
  fetchedBukka,
  deliveryMode
});

export default connect(
  mapStateToProps,
  null
)(BukkaDetailsSection);

BukkaDetailsSection.defaultProps = {
  description: '',
  fetchedBukka: {},
};

BukkaDetailsSection.propTypes = {
  fetchedBukka: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
      PropTypes.bool,
    ])),
  deliveryMode: PropTypes.string.isRequired
};

DeliveryPriceAndtag.propTypes = {
  deliveryPrice: PropTypes.number.isRequired,
  deliveryMode: PropTypes.string.isRequired
};

ActionButtons.propTypes = {
  deliveryTime: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
};

TitleAndDescription.defaultProps = {
  description: ''
};

TitleAndDescription.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};
