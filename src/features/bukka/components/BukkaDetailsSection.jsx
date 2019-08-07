import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'Components/button/Button';
import ButtonGroup from 'Components/button/ButtonGroup';
import Container from 'Components/container/Container';
import Clock from 'Icons/Clock';
import ChevronVertical from 'Icons/ChevronVertical';
import Star from 'Icons/Star';
import MapMarkerAlt from 'Icons/MapMarkerAlt';

import './bukkaDetailsSection.scss';

const DeliveryPriceAndtag = ({ deliveryPrice, deliveryMode }) => (
  <div className="delivery-price-tag">
    <div
      className={`row ${
        deliveryMode === 'pickup' ? 'justify-content-end' : ''
      }`}
    >
      {deliveryMode === 'pickup' ? null : (
        <div className="col col-9">
          <p className="delivery-price">${deliveryPrice} DELIVERY</p>
        </div>
      )}
      <div className="col col-3">
        <div className="tag-bukka">
          <Button
            classNames="tag-bukka-button"
            text="AFRICAN"
            handleClick={() => {}}
            type="button"
          />
        </div>
      </div>
    </div>
  </div>
);

const ActionButtons = ({ deliveryTime, address }) => (
  <div className="action-buttons-section">
    <ButtonGroup>
      <Button
        classNames="small-outline-button"
        handleClick={() => {}}
        type="button"
      >
        <p className="action-button-text">
          <Clock /> {deliveryTime} - {deliveryTime + 15} MIN
        </p>
      </Button>
      <Button
        classNames="small-outline-button"
        handleClick={() => {}}
        type="button"
      >
        <p className="action-button-text">
          <MapMarkerAlt /> {address}
        </p>
      </Button>
      <Button
        classNames="small-outline-button"
        handleClick={() => {}}
        type="button"
      >
        <p className="action-button-text">
          MORE INFO <ChevronVertical />
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
  address,
  deliveryMode
}) => {
  const { name, description } = fetchedBukka;
  if (Object.keys(fetchedBukka).length <= 0) {
    return null;
  }

  return (
    <Container classNames="bukka-details-section">
      <DeliveryPriceAndtag deliveryPrice={30} deliveryMode={deliveryMode} />
      <TitleAndDescription name={name} description={description} />
      <ActionButtons deliveryTime={'15'} address={address} />
    </Container>
  );
};

const mapStateToProps = ({
  fetchBukkaReducer: {
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
    ])),
  address: PropTypes.string.isRequired,
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
