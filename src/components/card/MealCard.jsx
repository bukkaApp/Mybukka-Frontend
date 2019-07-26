import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';
import Price from 'Components/badge/Price';

import setMealToDisplayAction from 'Redux/setMealToDisplayAction';

import './mealCard.scss';

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

const MealPicture = ({ imageUrl }) => (
  <Column classNames="col-4 col-md-3 col-lg-4 meal-picture-column">
    {imageUrl ? (
      <div className="meal-picture-section">
        <img className="meal-picture" src={imageUrl} alt="" />
      </div>
    ) : null}
  </Column>
);

const MealCard = ({
  title,
  imageUrl,
  description,
  price,
  setMealToDisplay,
  slug
}) => (
  <div
    className="meal-card"
    data-target="#mealModal"
    data-toggle="modal"
    onClick={() => setMealToDisplay(slug)}
    tabIndex={0}
    role="button"
  >
    <Row classNames="meals">
      <MealDetails title={title} price={price} description={description} />
      <MealPicture imageUrl={imageUrl} />
    </Row>
  </div>
);

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
