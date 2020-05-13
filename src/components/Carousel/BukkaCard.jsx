/* eslint-disable react/prop-types */
import React, { memo, useState } from 'react';

import PropTypes from 'prop-types';
import Navlink from 'Components/navlink/Navlink';
import generateImageSize from 'Utilities/generateScreenSizeImageUrl';

import Kit from './Kit';

import './BukkaCard.scss';
import { useCloudinayService } from '../img/Cloudinary';

const styles = {
  figure: {
    position: 'relative',
    margin: 0,
    width: '100%',
  },
  lqip: {
    width: '100%',
    //   filter: 'blur(5px)',
    opacity: 1,
    transition: 'all 0.5s ease-in'
  },
  fullsize: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    transition: 'all 0.5s ease-in'
  }
};

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
  itemClassName,
}) => {
  const { supports } = useCloudinayService();
  const [state, setState] = useState({
    isInViewport: false,
    width: 0,
    height: 0,
    lqipLoaded: false,
    fullsizeLoaded: false
  });

  const imageSpacingClassName = (type) => {
    if (type === 'cuisine') return 'cuisine-image-spacing';
    else if (type === 'collection') return 'collection-image-spacing';
    else if (type === 'category') return 'category-image-spacing';
    return 'normal-image-spacing';
  };

  if (state.fullsizeLoaded) {
    styles.lqip.opacity = 0;
  }

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
            style={styles.lqip}
            className="img-fluid"
            src={generateImageSize(imageUrl, ['150', 'auto'], 'scale', supports.webp ? 'webp' : 'jpg')}
            alt="alt_image"
            onLoad={() => { setState({ ...state, lqipLoaded: true }); }}
          />
          <div
            onLoad={() => { setState({ ...state, fullsizeLoaded: true }); }}
            style={{ backgroundImage: `url(${generateImageSize(imageUrl, ['650', 'auto'], 'scale', supports.webp ? 'webp' : 'jpg')})`, opacity: 1, ...styles.fullsize }}
            className={`custom-bukka-image ${itemClassName}`}
          />
        </div>

        <div className={imageSpacingClassName(carouselType)} />
        <Kit.TextOverlay
          top={top}
          bottom={bottom}
          heading={heading}
          textOverlay={textOverlay}
          subHeading={subHeading}
          type={carouselType}
        />
      </div>
      <Kit.NormalText
        deliveryCost={deliveryPrice}
        deliveryTime={deliveryTime}
        textOverlay={textOverlay}
        mealName={mealName}
        remark={remark}
        tags={tags}
        type={carouselType}
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

export default memo(GetBukka);

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
  remark: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
};
