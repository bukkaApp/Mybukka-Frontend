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

const NormalText = ({
  remark, mealName, deliveryCost, deliveryTime, rating, delivery
}) => (
  <div className="details">
    <h3>
      <span className="details-location">
        {mealName}
        {remark &&
        <span>
          <span className="icon">
            <MarkIcon />
          </span>
        </span>
        }
      </span>
      <span className="rating">{tags[0]}</span>
    </h3>
    <div className="delivery">
      {deliveryCost ? <Price price={deliveryCost} /> : null}
      {delivery && deliveryCost &&
      <span className="custom-delivery-badge">Delivery</span>
      }
      {deliveryCost && deliveryTime && <i className="dot-spacing">.</i>}
      {deliveryTime && <div className="delivery-time-text">{deliveryTime}</div>}
    </div>
  </div>
);

const BukkaCard = ({
  mealName,
  remark,
  imageUrl,
  deliveryPrice,
  deliveryTime,
  imageHeight,
  textOverlay,
  top,
  bottom,
  heading,
  subHeading,
  delivery,
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
          deliveryCost={deliveryPrice}
          deliveryTime={deliveryTime}
          mealName={mealName}
          remark={remark}
          delivery={delivery}
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
  delivery: false,
  deliveryCost: 0,
  mealName: '',
  remark: false,
};

NormalText.propTypes = {
  remark: PropTypes.bool,
  delivery: PropTypes.bool,
  mealName: PropTypes.string,
  deliveryCost: PropTypes.number,
  deliveryTime: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
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
  delivery: false,
  mealName: '',
  remark: false,
  deliveryTime: '',
  rating: '',
  imageHeight: '',
  textOverlay: false,
  deliveryCost: 0,
  top: false,
  bottom: false,
  heading: 'Free Delivery',
  subHeading: '',
  tags: ['nearby'],
};

BukkaCard.propTypes = {
  delivery: PropTypes.bool,
  remark: PropTypes.bool,
  mealName: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  deliveryPrice: PropTypes.number.isRequired,
  deliveryTime: PropTypes.string,
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
  href: PropTypes.string,
  slug: PropTypes.string.isRequired,
};
