import React, { Fragment } from 'react';

import shortId from 'shortid';
import PropTypes from 'prop-types';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';

import MealCard from './MealCard';

import './bukkaMeals.scss';

const BukkaMealsHeader = ({ category }) => (
  <div className="bukka-meals-header">
    <h4 className="header-text">{category}</h4>
  </div>
);

const BukkaMeals = ({ mealsData }) => {
  const bukkaCategories = [
    ...new Set(mealsData.map(mealData => mealData.category))
  ];

  return (
    <Container classNames="menu-catalogs">
      {bukkaCategories.map(eachCategory => (
        <Fragment key={shortId.generate()}>
          <BukkaMealsHeader category={eachCategory} />
          <Row classNames="menu-section">
            {mealsData.map((mealData) => {
              if (mealData.category !== eachCategory) {
                return null;
              }
              return (
                <Column
                  classNames="col-12 col-lg-6 col-xl-6 col-xs-12 col-sm-12 meal-column"
                  key={`${shortId.generate()}`}
                >
                  <MealCard {...mealData} />
                </Column>
              );
            })}
          </Row>
        </Fragment>
      ))}
    </Container>
  );
};

export default BukkaMeals;

BukkaMealsHeader.propTypes = {
  category: PropTypes.string.isRequired
};

BukkaMeals.propTypes = {
  mealsData: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  })).isRequired
};
