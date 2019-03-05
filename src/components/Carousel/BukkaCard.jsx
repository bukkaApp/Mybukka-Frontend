import React from 'react';

import PropTypes from 'prop-types';

import MarkIcon from 'Icons/Remark';
import Navlink from 'Components/navlink/Navlink';
import Price from 'Components/badge/Price';

import './BukkaCard.scss';

const TextOverlay = () => (
  <div className="overlay">
    <h4>Chipotle</h4>
    <h5>Order Now</h5>
  </div>
);

const NormalText = ({ deliveryCost, deliveryTime, rating }) => (
  <div className="details">
    <h3>
      <span className="details-location">
        San francisco
        <span>
          kitchen
          <span className="icon">
            <MarkIcon />
          </span>
        </span>
      </span>
      {rating && <span className="rating">{rating}</span>}
    </h3>
    <div className="delivery">
      {deliveryCost ? <Price price={deliveryCost} /> : null}
      {deliveryCost ? <i className="dot-spacing">.</i> : null}
      <div className="delivery-time-text">{deliveryTime}</div>
    </div>
  </div>
);

const BukkaCard = ({
  imageUrl,
  deliveryCost,
  deliveryTime,
  rating,
  imageHeight,
  textOverlay
}) => (
  <div className={['mt-4 bukka-card'].join(' ')}>
    <img className={`bukka-img ${imageHeight}`} src={imageUrl} alt="alt_image" />
    {textOverlay && <TextOverlay />}
    {!textOverlay && (
      <NormalText
        deliveryCost={deliveryCost}
        deliveryTime={deliveryTime}
        rating={rating}
      />
    )}
  </div>
);

const GetBukka = ({ classNames, ...props }) => (
  <div className={`card-container ${classNames}`}>
    <div className="card-wrap">
      <Navlink classNames="link" href="/">
        <BukkaCard {...props} />
      </Navlink>
    </div>
  </div>
);

export default GetBukka;

NormalText.defaultProps = {
  deliveryTime: '20 - 40',
  rating: '',
  deliveryCost: 0
};

NormalText.propTypes = {
  deliveryCost: PropTypes.number,
  deliveryTime: PropTypes.string,
  rating: PropTypes.string
};

BukkaCard.defaultProps = {
  deliveryTime: '20 - 40',
  rating: '',
  imageHeight: '',
  textOverlay: false,
  deliveryCost: 0,
};

BukkaCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  deliveryCost: PropTypes.number,
  deliveryTime: PropTypes.string,
  rating: PropTypes.string,
  imageHeight: PropTypes.string,
  textOverlay: PropTypes.bool
};

GetBukka.defaultProps = {
  classNames: ''
};

GetBukka.propTypes = {
  classNames: PropTypes.string
};
