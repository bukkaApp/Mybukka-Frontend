import React, { Fragment } from 'react';

import { Route, matchPath } from 'react-router-dom';

import FoodSection from './FoodSection';
import OtherSection from './OtherSection';
import SearchResult from './SearchResult';
import Category from './Category';
import Favorites from './Favorites';

import './feed.scss';

const Feed = (props) => {
  const pathMatch = matchPath(props.location.pathname, { path: '/:id' });
  const match = props.match;
  console.log('pathMatch', pathMatch, 'match', match);
  let Component;
  if (pathMatch.params.id === 'feed') {
    Component = FoodSection;
  } else if (pathMatch.params.id === 'search') {
    Component = SearchResult;
  } else if (pathMatch.params.id === 'category') {
    Component = Category;
  } else if (pathMatch.params.id === 'favorites') {
    Component = Favorites;
  } else {
    Component = OtherSection;
  }

  return (
    <Fragment>
      <Route path={`${match.path}`} component={Component} />
    </Fragment>
  );
};

export default Feed;

Feed.defaultProps = {};

Feed.propTypes = {};
