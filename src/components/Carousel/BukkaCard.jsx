/* eslint-disable react/prop-types */
import React from 'react';

import PropTypes from 'prop-types';
import Navlink from 'Components/navlink/Navlink';
import generateImageSize from 'Utilities/generateScreenSizeImageUrl';

import Kit from './Kit';

import './BukkaCard.scss';

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
  others,
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
        className={`mt-4 bukka-card ${others ? 'other-bukka-card' : ''}`}
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
        <Kit.TextOverlay
          top={top}
          bottom={bottom}
          heading={heading}
          textOverlay={textOverlay}
          subHeading={subHeading}
        />
      </div>
      <Kit.NormalText
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
