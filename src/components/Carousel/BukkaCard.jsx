/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import generateImageSize from 'Utilities/generateScreenSizeImageUrl';

import Kit from './Kit';

import './BukkaCard.scss';
import { useCloudinayService } from '../img/Cloudinary';
import { useSessionStorage } from '../../hooks/useSession';

const styles = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
  transition: 'all 0.5s ease-in',
  backgroundColor: '#e9e7e7'
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
  dataTarget,
  dataToggle,
  handleClick,
  others,
  itemClassName,
}) => {
  const _imgRef = React.createRef();
  const [sessionItem, setItem] = useSessionStorage(`___${imageUrl}____`, false);
  const { supports } = useCloudinayService();
  const [state, setState] = useState(false);
  const img = generateImageSize(imageUrl, ['650', 'auto'], 'scale', (supports.webp && 'webp') || 'jpg');

  const handleScroll = () => {
    if (_imgRef.current && _imgRef.current.complete && !state) {
      setState(true);
      setItem(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [_imgRef]);

  const handleLoad = () => {
    setState(true);
    setItem(true);
  };

  const imageSpacingClassName = (type) => {
    if (type === 'cuisine') return 'cuisine-image-spacing';
    else if (type === 'collection') return 'collection-image-spacing';
    else if (type === 'category') return 'category-image-spacing';
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
            ref={_imgRef}
            style={{ display: 'none' }}
            className="img-fluid"
            src={img}
            alt="alt_image"
            onLoad={handleLoad}
          />
          <div
            style={{ backgroundImage: `url(${img})`, opacity: state || sessionItem ? 1 : 0, }}
            className={`custom-bukka-image ${itemClassName}`}
          />
          <div style={{ ...styles, opacity: state || sessionItem ? 0 : 1 }} />
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
      />
    </div>
  );
};

const GetBukka = ({ classNames, href, onMouseEnter, onMouseLeave, ...props }) => (
  <div className={`card-container ${classNames}`}>
    <div className="card-wrap">
      {href &&
        <Link
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="link"
          to={href}
        >
          <BukkaCard {...props} />
        </Link>}
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
