/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import MarkIcon from 'Icons/Remark';
import Price from 'Components/badge/Price';


const randomNum = tagLenght => Math.floor(Math.random() * tagLenght);

const Rating = ({ tags }) => (
  <span className="rating">{tags ?
    tags[randomNum(tags.length)] : 'POPULAR'}
  </span>
);

const Remark = () => (
  <span>
    <span className="icon">
      <MarkIcon />
    </span>
  </span>
);

const RestauranDetails = ({ name, remark }) => (
  <span className="details-location">
    {name}
    {remark && <Remark />}
  </span>
);

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

const TextOverlay = ({ top, bottom, heading, subHeading, textOverlay }) => (
  textOverlay &&
  <Fragment>
    {top && <TopOverlayText heading={heading} subHeading={subHeading} />}
    {bottom && <BottomOverlayText heading={heading} subHeading={subHeading} />}
  </Fragment>
);

const NormalText = ({
  remark, mealName, deliveryCost, tags,
  textOverlay,
  type,
}) => (
  !textOverlay &&
  <div className="details">
    <h3>
      <RestauranDetails name={mealName} remark={remark} />
      {tags.length > 0 && tags[0] !== null && <Rating tags={tags} />}
    </h3>
    <div className="delivery">
      {deliveryCost ? <Price price={deliveryCost} /> : null}
      {(type !== 'category' && deliveryCost) &&
      <span className="custom-delivery-badge">Delivery</span>
      }
    </div>
  </div>
);

export default {
  NormalText,
  TextOverlay,
};

NormalText.defaultProps = {
  deliveryTime: '',
  rating: '',
  delivery: false,
  deliveryCost: 0,
  mealName: '',
  remark: false,
  tags: []
};

NormalText.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  remark: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  mealName: PropTypes.string,
  deliveryCost: PropTypes.number,
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

