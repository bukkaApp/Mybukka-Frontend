import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useCookies } from 'react-cookie';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';
import Price from 'Components/badge/Price';

import setMealToDisplayAction from 'Redux/setMealToDisplayAction';

import './mealCard.scss';
import { useModalContext } from '../../context/ModalContext';
import { useCloudinayService } from '../img/Cloudinary';

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
  // Loop through option prop and build queryString
  const [cookies, setCookie] = useCookies([`_${img || '__img'}`]);

  const handleLoad = () => {
    setState(true);
    setCookie(`_${img || '__img'}`, true, { path: '/' });
  };

  return (
    <Column classNames="col-4 col-md-3 col-lg-4 meal-picture-column">
      {imageUrl ? (
        <div className="meal-picture-section position-relative">
          <img onLoad={handleLoad} className="d-none" src={`${img}`} alt="" />
          <div className="meal-picture" style={{ backgroundImage: `url(${img})`, opacity: state || cookies[`_${img}`] ? 1 : 0 }} />
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
  setMealToDisplay,
  slug
}) => {
  const { setModal } = useModalContext();
  return (
    <div
      className="meal-card"
      onClick={() => {
        setMealToDisplay(slug, null, true);
        setModal(true);
      }}
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

export default connect(
  () => ({}),
  { setMealToDisplay: setMealToDisplayAction }
)(MealCard);

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
  setMealToDisplay: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
};
