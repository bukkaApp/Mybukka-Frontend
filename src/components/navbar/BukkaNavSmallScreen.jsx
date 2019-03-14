import React from 'react';
import PropTypes from 'prop-types';

import SearchPlusMenu from '../icons/SearchPlusMenu';

import './bukkaNavSmallScreen.scss';

const BukkaNavSmallScreen = ({ currentCategory }) => (
  <div className="bukka-nav-small d-lg-none">
    <nav className="navbar navbar-light bukka-nav-small-content">
      <div className="current-category">
        <h5 className="current-category-text">{currentCategory}</h5>
      </div>
      <SearchPlusMenu />
    </nav>
  </div>
);

export default BukkaNavSmallScreen;

BukkaNavSmallScreen.propTypes = {
  currentCategory: PropTypes.string.isRequired
};
