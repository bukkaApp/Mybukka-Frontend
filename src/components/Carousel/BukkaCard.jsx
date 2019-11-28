/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Navlink from 'Components/navlink/Navlink';
import generateImageSize from 'Utilities/generateScreenSizeImageUrl';
import MarkIcon from 'Icons/Remark';
import Price from 'Components/badge/Price';

import './BukkaCard.scss';

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
  remark, mealName, deliveryCost, deliveryTime, delivery, tags,
  textOverlay,
}) => (
  !textOverlay &&
  <div className="details">
    <h3>
      <RestauranDetails name={mealName} remark={remark} />
      {tags.length > 0 && tags[0] !== null && <Rating tags={tags} />}
    </h3>
    <div className="delivery">
      {deliveryCost ? <Price price={deliveryCost} /> : null}
      {deliveryCost &&
      <span className="custom-delivery-badge">Delivery</span>
      }
    </div>
  </div>
);

const BukkaCard = ({
  mealName,
  remark,
  imageUrl,
  tags,
  deliveryPrice,
  deliveryTime,
  carouselType,
  textOverlay,
  top,
  bottom,
  heading,
  subHeading,
  delivery,
  dataTarget,
  dataToggle,
  handleClick,
}) => {
  const smImgUrl = generateImageSize(imageUrl, ['320', 'auto']);

  const lgImgUrl = generateImageSize(imageUrl, ['650', 'auto']);

  const imageSpacingClassName = (type) => {
    if (type === 'cuisine') {
      return 'cuisine-image-spacing';
    } else if (type === 'collection') {
      return 'collection-image-spacing';
    }
    return 'normal-image-spacing';
  };

  return (
    <div>
      <div
        className="mt-4 bukka-card"
        data-target={dataTarget}
        data-toggle={dataToggle}
        onClick={handleClick}
        tabIndex={0}
        role="button"
      >
        <div>
          <img
            className="img-fluid d-none"
            src={smImgUrl}
            alt="alt_image"
          />
          <div
            style={{ backgroundImage: `url(${lgImgUrl})`, opacity: 1 }}
            className="custom-bukka-image"
          />
        </div>

        <div className={imageSpacingClassName(carouselType)} />
        <TextOverlay
          top={top}
          bottom={bottom}
          heading={heading}
          textOverlay={textOverlay}
          subHeading={subHeading}
        />
      </div>
      <NormalText
        deliveryCost={deliveryPrice}
        deliveryTime={deliveryTime}
        textOverlay={textOverlay}
        mealName={mealName}
        remark={remark}
        tags={tags}
        delivery={delivery}
      />
    </div>
  );
};

const GetBukka = ({ classNames, href, ...props }) => (
  <div className={`card-container ${classNames}`}>
    <div className="card-wrap">
      {href &&
      <Navlink classNames="link" href={href}>
        <BukkaCard {...props} />
      </Navlink>
      }
      {!href && <BukkaCard {...props} />}
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
  tags: []
};

NormalText.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  remark: PropTypes.bool,
  delivery: PropTypes.bool,
  mealName: PropTypes.string,
  deliveryCost: PropTypes.number,
  deliveryTime: PropTypes.string,
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
  dataTarget: '',
  dataToggle: '',
  delivery: false,
  mealName: '',
  remark: false,
  deliveryTime: '',
  rating: '',
  carouselType: '',
  textOverlay: false,
  deliveryPrice: 0,
  top: false,
  bottom: false,
  heading: 'Free Delivery',
  subHeading: '',
  tags: [],
};

BukkaCard.propTypes = {
  dataTarget: PropTypes.string,
  dataToggle: PropTypes.string,
  delivery: PropTypes.bool,
  remark: PropTypes.bool,
  mealName: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  deliveryPrice: PropTypes.number.isRequired,
  deliveryTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  carouselType: PropTypes.string,
  textOverlay: PropTypes.bool,
  top: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  heading: PropTypes.string,
  subHeading: PropTypes.string
};

GetBukka.defaultProps = {
  classNames: '',
  href: ''
};

GetBukka.propTypes = {
  classNames: PropTypes.string,
  href: PropTypes.string,
  slug: PropTypes.string.isRequired,
};
