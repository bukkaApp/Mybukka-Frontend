import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import shortId from 'shortid';
import PropTypes from 'prop-types';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';

import MealCard from 'Components/card/MealCard';

import './bukkaMeals.scss';

const BukkaMealsHeader = ({ category }) => (
  <div className="bukka-meals-header" id={category}>
    <h4 className="header-text">{category}</h4>
  </div>
);

const BukkaMeals = ({ bukkaMenu, searchQuery }) => {
  const bukkaCategories = [
    ...new Set(bukkaMenu.map(mealData => mealData.category))
  ];

  return (
    <Container classNames="menu-catalogs">
      {bukkaCategories.map(eachCategory => (
        <Fragment key={shortId.generate()}>
          <BukkaMealsHeader category={eachCategory} />
          <Row classNames="menu-section">
            {bukkaMenu.map(mealData => (
              <>
                {mealData.category === eachCategory && mealData.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                  <Column
                    classNames="col-12 col-lg-6 col-xl-6 col-xs-12 col-sm-12 meal-column"
                    key={`${shortId.generate()}`}
                  >
                    <MealCard {...mealData} />
                  </Column>
                )}
              </>
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
  null
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
  ).isRequired
};
