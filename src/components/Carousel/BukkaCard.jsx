import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Navlink from 'Components/navlink/Navlink';
import generateImageSize from 'Utilities/generateScreenSizeImageUrl';
import MarkIcon from 'Icons/Remark';
// import Navlink from 'Components/navlink/Navlink';
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
  remark, mealName, deliveryCost, deliveryTime, delivery, tags
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
      {tags.length > 0 &&
      <span className="rating">{tags ? tags[0] : 'POPULAR'}</span>
      }
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
  imageHeight,
  textOverlay,
  top,
  bottom,
  heading,
  subHeading,
  delivery,
  dataTarget,
  dataToggle,
}) => {
  const smImgUrl = generateImageSize(imageUrl, '320');

  const lgImgUrl = generateImageSize(imageUrl, '640');

  return (
    <div className="mt-4 bukka-card" data-target={dataTarget} data-toggle={dataToggle}>
      <img
        className={`img-small-screen bukka-img ${imageHeight}`}
        src={smImgUrl}
        alt="alt_image"
      />
      <img
        className={`img-large-screen bukka-img ${imageHeight}`}
        src={lgImgUrl}
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
          tags={tags}
          delivery={delivery}
        />
      )}
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
  imageHeight: '',
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
  imageHeight: PropTypes.string,
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
