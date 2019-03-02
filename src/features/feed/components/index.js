import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import AddToCart from 'Components/common/addToCart';

import FoodSection from './FoodSection';
import DrinkSection from './DrinkSection';
import SearchResult from './SearchResult';
import FreshSection from './FreshSection';
import Category from './Category';
import Favorites from './Favorites';

import './feed.scss';

const Feed = ({ push, food, drink, search, category, fresh, favorites }) => (
  <Fragment>
    <AddToCart />
    {food && <FoodSection push={push} />}
    {drink && <DrinkSection push={push} />}
    {search && <SearchResult push={push} />}
    {fresh && <FreshSection push={push} />}
    {category && <Category push={push} />}
    {favorites && <Favorites push={push} />}
  </Fragment>
);

export default Feed;

Feed.defaultProps = {
  food: false,
  drink: false,
  search: false,
  category: false,
  fresh: false,
  favorites: false,
};

Feed.propTypes = {
  favorites: PropTypes.bool,
  fresh: PropTypes.bool,
  category: PropTypes.bool,
  search: PropTypes.bool,
  food: PropTypes.bool,
  drink: PropTypes.bool,
  push: PropTypes.func.isRequired
};
