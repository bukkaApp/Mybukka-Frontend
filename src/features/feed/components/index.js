import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import AddToCart from 'Components/common/addToCart';

import FoodSection from './FoodSection';
import OtherSection from './OtherSection';
import SearchResult from './SearchResult';
import Category from './Category';
import Favorites from './Favorites';

import './feed.scss';

const Feed = ({
  push,
  food,
  mart,
  search,
  category,
  fresh,
  favorites,
  ...props
}) => (
  <Fragment>
    <AddToCart />
    {food && <FoodSection {...props} push={push} />}
    {mart && <OtherSection {...props} push={push} type="mart" />}
    {search && <SearchResult {...props} push={push} />}
    {fresh && <OtherSection {...props} push={push} type="fresh" />}
    {category && <Category {...props} push={push} />}
    {favorites && <Favorites {...props} push={push} />}
  </Fragment>
);

export default Feed;

Feed.defaultProps = {
  food: false,
  mart: false,
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
  mart: PropTypes.bool,
  push: PropTypes.func.isRequired,
};
