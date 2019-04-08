import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import generateSmImageUrl from 'Utilities/generateSmallScreenImageUrl';
import MarkIcon from 'Icons/Remark';
import Navlink from 'Components/navlink/Navlink';
import Price from 'Components/badge/Price';

import './BukkaCard.scss';

const TopOverlayText = ({ heading, subHeading }) => (
  <div className="overlay-top">
    <h4>{heading}</h4>
    <h5>{subHeading}</h5>
  </div>
);

const BottomOverlayText = ({ heading, subHeading }) => (
  <div className="overlay-bottom">
    <h4 className={
      `${subHeading ? 'overlay-h4' : 'overlay-h4s'}`}
    >{heading}</h4>
    {subHeading && <h5>{subHeading}</h5>}
  </div>
);

const TextOverlay = ({ top, bottom, heading, subHeading }) => (
  <Fragment>
    {top && <TopOverlayText heading={heading} subHeading={subHeading} />}
    {bottom && <BottomOverlayText heading={heading} subHeading={subHeading} />}
  </Fragment>
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
      {deliveryCost && deliveryTime ? <i className="dot-spacing">.</i> : null}
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
  textOverlay,
  top,
  bottom,
  heading,
  subHeading
}) => {
  const smImgUrl = generateSmImageUrl(imageUrl);

  return (
    <div className="mt-4 bukka-card">
      <img
        className={`img-small-screen bukka-img ${imageHeight}`}
        src={smImgUrl}
        alt="alt_image"
      />
      <img
        className={`img-large-screen bukka-img ${imageHeight}`}
        src={imageUrl}
        alt="alt_image"
      />
      {textOverlay && (
        <TextOverlay
          top={top}
          bottom={bottom}
          heading={heading}
          subHeading={subHeading}
        />
      )}
      {!textOverlay && (
        <NormalText
          deliveryCost={deliveryCost}
          deliveryTime={deliveryTime}
          rating={rating}
        />
      )}
    </div>
  );
};

const GetBukka = ({ classNames, href, ...props }) => (
  <div className={`card-container ${classNames}`}>
    <div className="card-wrap">
      <Navlink classNames="link" href={href}>
        <BukkaCard {...props} />
      </Navlink>
    </div>
  </div>
);

export default GetBukka;

NormalText.defaultProps = {
  deliveryTime: '',
  rating: '',
  deliveryCost: 0
};

NormalText.propTypes = {
  deliveryCost: PropTypes.number,
  deliveryTime: PropTypes.string,
  rating: PropTypes.string
};

TextOverlay.propTypes = {
  top: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  bottom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired
};

TopOverlayText.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired
};

BottomOverlayText.defaultProps = {
  subHeading: ''
};

BottomOverlayText.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
};

BukkaCard.defaultProps = {
  deliveryTime: '',
  rating: '',
  imageHeight: '',
  textOverlay: false,
  deliveryCost: 0,
  top: false,
  bottom: false,
  heading: 'Free Delivery',
  subHeading: ''
};

BukkaCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  deliveryCost: PropTypes.number,
  deliveryTime: PropTypes.string,
  rating: PropTypes.string,
  imageHeight: PropTypes.string,
  textOverlay: PropTypes.bool,
  top: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  heading: PropTypes.string,
  subHeading: PropTypes.string
};

GetBukka.defaultProps = {
  classNames: '',
  href: '/feed'
};

GetBukka.propTypes = {
  classNames: PropTypes.string,
  href: PropTypes.string
};
