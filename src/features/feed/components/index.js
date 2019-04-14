import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import FoodSection from './FoodSection';
import DrinkSection from './DrinkSection';
import SearchResult from './SearchResult';
import FreshSection from './FreshSection';
import Category from './Category';

import './feed.scss';

const Feed = ({ push, food, drink, search, category, fresh }) => (
  <Fragment>
    {food && <FoodSection push={push} />}
    {drink && <DrinkSection push={push} />}
    {search && <SearchResult push={push} />}
    {fresh && <FreshSection push={push} />}
    {category && <Category push={push} />}
  </Fragment>
);

export default Feed;

Feed.defaultProps = {
  food: false,
  drink: false,
  search: false,
  category: false,
  fresh: false
};

Feed.propTypes = {
  fresh: PropTypes.bool,
  category: PropTypes.bool,
  search: PropTypes.bool,
  food: PropTypes.bool,
  drink: PropTypes.bool,
  push: PropTypes.func.isRequired
};
