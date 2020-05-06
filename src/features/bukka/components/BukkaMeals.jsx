import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';

import MealCard from 'Components/card/MealCard';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';

import './bukkaMeals.scss';

const BukkaMealsHeader = ({ category }) => (
  <div className="bukka-meals-header" id={category}>
    <h4 className="header-text">{category}</h4>
  </div>
);

const BukkaMeals = ({ bukkaMenu, searchQuery, fetchBukkaMenu }) => {
  const bukkaCategories = [
    ...new Set(bukkaMenu.map(mealData => mealData.category))
  ];

  const handleFetchBukkaMenuIfNoMenu = () => {
    if (bukkaMenu.length <= 0
      || Object.keys(bukkaMenu[0]).length <= 0) {
      const bukkaToFetch = location.pathname.split('/')[2];
      fetchBukkaMenu(bukkaToFetch);
    }
  };

  useEffect(() => {
    handleFetchBukkaMenuIfNoMenu();
  }, []);

  if (bukkaMenu.length <= 0
    || Object.keys(bukkaMenu[0]).length <= 0) {
    return null;
  }

  return (
    <Container classNames="menu-catalogs">
      {bukkaCategories.map(eachCategory => (
        <Fragment key={`store-menu-catelogs-${eachCategory}`}>
          <BukkaMealsHeader category={eachCategory} />
          <Row classNames="menu-section">
            {bukkaMenu.map(mealData => (
              <Fragment key={`store-menu-catelogs-${mealData.title}-${mealData._id}`}>
                {mealData.category === eachCategory && mealData.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                  <Column classNames="col-12 col-lg-6 col-xl-6 col-xs-12 col-sm-12 meal-column">
                    <MealCard {...mealData} />
                  </Column>
                )}
              </Fragment>
            ))}
          </Row>
        </Fragment>
      ))}
    </Container>
  );
};

const mapStateToProps = ({ fetchBukkaMenuReducer: { bukkaMenu } }) => ({
  bukkaMenu
});

export default connect(
  mapStateToProps,
  { fetchBukkaMenu: fetchBukkaMenuAction }
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
