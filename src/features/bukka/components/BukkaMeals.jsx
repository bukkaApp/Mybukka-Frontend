import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';

import MealCard from 'Components/card/MealCard';


import './bukkaMeals.scss';
import NoResult from '../../../components/not-found/NoResult';

const BukkaMealsHeader = ({ category }) => (
  <div className="bukka-meals-header" id={category}>
    <h4 className="header-text">{category}</h4>
  </div>
);

const BukkaMeals = ({ bukkaMenu, searchQuery, isInSearch, hasNoResult }) => {
  const bukkaCategories = [
    ...new Set(bukkaMenu.map(mealData => mealData.category))
  ];

  if (bukkaMenu.length <= 0
    || Object.keys(bukkaMenu[0]).length <= 0) {
    return null;
  }

  const onSearch = (category, items) => {
    const isCategory = item => item.category === category;
    return Array.isArray(items) ? items.filter(menu => isCategory(menu) && isInSearch(menu))
      : isCategory(items) && isInSearch(items);
  };

  return (
    <Container classNames={hasNoResult() ? '' : 'menu-catalogs'}>
      {bukkaCategories.map(eachCategory => (
        onSearch(eachCategory, bukkaMenu).length > 0 &&
        <Fragment key={`store-menu-catelogs-${eachCategory}`}>
          <BukkaMealsHeader category={eachCategory} />
          <Row classNames="menu-section">
            {bukkaMenu.map(mealData => (
              <Fragment key={`store-menu-catelogs-${mealData.title}-${mealData._id}`}>
                {onSearch(eachCategory, mealData) && (
                  <Column classNames="col-12 col-lg-6 col-xl-6 col-xs-12 col-sm-12 meal-column">
                    <MealCard {...mealData} />
                  </Column>
                )}
              </Fragment>
            ))}
          </Row>
        </Fragment>
      ))}
      {hasNoResult() && <NoResult withPadding text={searchQuery} />}
    </Container>
  );
};

const mapStateToProps = ({ productsReducer: { bukkaMenu } }) => ({
  bukkaMenu
});

export default connect(
  mapStateToProps,
)(BukkaMeals);

BukkaMealsHeader.propTypes = {
  category: PropTypes.string.isRequired
};

BukkaMeals.propTypes = {
  bukkaMenu: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      title: PropTypes.string,
      name: PropTypes.string,
      imageUrl: PropTypes.string
    })
  ).isRequired,
  fetchBukkaMenu: PropTypes.func.isRequired,
};
