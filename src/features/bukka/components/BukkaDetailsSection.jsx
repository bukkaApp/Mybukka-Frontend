import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/button/Button';
import ButtonGroup from 'Components/button/ButtonGroup';
import Container from 'Components/container/Container';
import Clock from 'Icons/Clock';
import ChevronVertical from 'Icons/ChevronVertical';
import Star from 'Icons/Star';
import MapMarkerAlt from 'Icons/MapMarkerAlt';

import './bukkaDetailsSection.scss';

const DeliveryPriceAndtag = ({ deliveryPrice }) => (
  <div className="delivery-price-tag">
    <div className="row">
      <div className="col col-9">
        <p className="delivery-price">${deliveryPrice} DELIVERY</p>
      </div>
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
      <Button classNames="small-outline-button" handleClick={() => {}} type="button">
        <p className="action-button-text">
          <Clock /> {deliveryTime} - {deliveryTime + 15} MIN
        </p>
      </Button>
      <Button classNames="small-outline-button" handleClick={() => {}} type="button">
        <p className="action-button-text">
          <MapMarkerAlt /> {address}
        </p>
      </Button>
      <Button classNames="small-outline-button" handleClick={() => {}} type="button">
        <p className="action-button-text">
          MORE INFO <ChevronVertical />
        </p>
      </Button>
    </ButtonGroup>
  </div>
);

const TitleAndDescription = ({ bukkaName, description }) => (
  <div className="bukka-details-title">
    <h1 className="bukka-title">{bukkaName}</h1>
    <div className="rating-details">
      <p className="bukka-rating-text">
        <Star /> 107 persons rated
      </p>
    </div>
    <p className="bukka-description">{description}</p>
  </div>
);

const BukkaDetailsSection = ({ bukkaName, description }) => (
  <Container classNames="bukka-details-section">
    <DeliveryPriceAndtag deliveryPrice={30} />
    <TitleAndDescription bukkaName={bukkaName} description={description} />
    <ActionButtons deliveryTime={'15'} address="2, lekki Aja road" />
  </Container>
);

export default BukkaDetailsSection;

BukkaDetailsSection.defaultProps = {
  description: '',
};

BukkaDetailsSection.propTypes = {
  bukkaName: PropTypes.string.isRequired,
  description: PropTypes.string,
};

DeliveryPriceAndtag.propTypes = {
  deliveryPrice: PropTypes.number.isRequired,
};

ActionButtons.propTypes = {
  deliveryTime: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

TitleAndDescription.defaultProps = {
  description: '',
};

TitleAndDescription.propTypes = {
  bukkaName: PropTypes.string.isRequired,
  description: PropTypes.string,
};
