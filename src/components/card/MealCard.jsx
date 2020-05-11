import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';
import Price from 'Components/badge/Price';

import setMealToDisplayAction from 'Redux/setMealToDisplayAction';

import './mealCard.scss';
import { useModalContext } from '../../context/UseModal';
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
  const { domain, supports } = useCloudinayService();
  let ext = 'jpg', queryString = '';
  const options = {
    w: '320', // width
    q: 85, // quality
    c: 'scale' // mode
  };

  const [storageClienId, imgSrc] = imageUrl.replace(domain, '').split('upload');
  const imgSrcWithoutExt = imgSrc.replace(/\.(jpe?g|gif|png|PNG|svg|webp)$/, '');

  // Loop through option prop and build queryString
  Object.keys(options).map((option, i) => queryString += `${i < 1 ? '' : ','}${option}_${options[option]}`); // eslint-disable-line

  // If a format has not been specified, detect webp support
  if (supports.webp) {
    ext = 'webp';
  }

  return (
    <Column classNames="col-4 col-md-3 col-lg-4 meal-picture-column">
      {imageUrl ? (
        <div className="meal-picture-section position-relative">
          <img className="d-none" src={`${domain}${storageClienId}upload/${queryString}${imgSrcWithoutExt}.${ext}`} alt="" />
          <div className="meal-picture" style={{ backgroundImage: `url(${domain}${storageClienId}upload/${queryString}${imgSrcWithoutExt}.${ext})` }} />
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
