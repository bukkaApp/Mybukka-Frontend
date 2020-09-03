import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// import { useCookies } from 'react-cookie';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';
import Price from 'Components/badge/Price';

import './mealCard.scss';
import { useModalContext } from '../../context/ModalContext';
import { useCloudinayService } from '../img/Cloudinary';
import { useBusinessContext } from '../../context/BusinessContext';

export const MealTitle = ({ title }) => (
  <div className="meal-title-section">
    <h4 className="meal-title">{title}</h4>
  </div>
);

const PriceTag = ({ price }) => (
  <div className="price-tag-section">
    <Price price={price} />
  </div>
);

export const MealDescription = ({ description }) => (
  <div className="meal-description-section">
    <h5 className="meal-description">{description}</h5>
  </div>
);

const MealDetails = ({ title, price, description }) => (
  <Column classNames="col-8 col-md-9 col-lg-8 meal-details-column">
    <MealTitle title={title} />
    <MealDescription description={description} />
    <PriceTag price={price} />
  </Column>
);

const MealPicture = ({ imageUrl }) => {
  const imgRef = React.useRef();
  const [state, setState] = useState(false);
  const { domain, supports } = useCloudinayService();
  let ext = 'jpg', queryString = '', img;
  // If a format has not been specified, detect webp support
  if (supports.webp) {
    ext = 'webp';
  }
  const options = {
    w: '320', // width
    q: 85, // quality
    c: 'scale' // mode
  };

  if (imageUrl !== '') {
  Object.keys(options).map((option, i) => queryString += `${i < 1 ? '' : ','}${option}_${options[option]}`); // eslint-disable-line
    const [storageClienId, imgSrc] = imageUrl.replace(domain, '').split('upload');
    const imgSrcWithoutExt = imgSrc.replace(/\.(jpe?g|gif|png|PNG|svg|webp)$/, '');
    img = `${domain}${storageClienId}upload/${queryString}${imgSrcWithoutExt}.${ext}`;
  }

  const handleLoad = () => {
    setState(true);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && !state) {
      setState(true);
    }
  }, [imgRef]);

  return (
    <Column classNames="col-4 col-md-3 col-lg-4 meal-picture-column">
      {imageUrl ? (
        <div className="meal-picture-section position-relative">
          <img ref={imgRef} onLoad={handleLoad} className="d-none" src={`${img}`} alt="" />
          <div className="meal-picture" style={{ backgroundImage: `url(${img})`, opacity: state ? 1 : 0 }} />
        </div>
      ) : null}
    </Column>
  );
};

const MealCard = ({
  title,
  imageUrl,
  description,
  price,
  slug
}) => {
  const { setModal, setCartPopup } = useModalContext();
  const { setCatelogToDisplay } = useBusinessContext();

  const onClick = () => {
    setCatelogToDisplay(slug);
    setCartPopup(true);
    setModal(true);
  };

  return (
    <div
      className="meal-card"
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <Row classNames="meals">
        <MealDetails title={title} price={price} description={description} />
        <MealPicture imageUrl={imageUrl} />
      </Row>
    </div>
  );
};

export default MealCard;

PriceTag.propTypes = {
  price: PropTypes.number.isRequired
};

MealTitle.propTypes = {
  title: PropTypes.string.isRequired
};

MealDescription.propTypes = {
  description: PropTypes.string.isRequired
};

MealPicture.defaultProps = {
  imageUrl: ''
};

MealPicture.propTypes = {
  imageUrl: PropTypes.string
};

MealDetails.defaultProps = {
  title: '',
  description: '',
  price: 0
};

MealDetails.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number
};

MealCard.defaultProps = {
  title: '',
  description: '',
  price: 0,
  imageUrl: ''
};

MealCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  slug: PropTypes.string.isRequired
};
