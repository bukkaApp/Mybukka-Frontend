import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/Button';

// const SuggestionsDropdown = () => (
//   <div className="suggestion-dropdown">
//     <SearchLocation
//       chevronButtonVisible={false}
//       showDeliveryOrPickupNav={false}
//     />
//   </div>
// );

export const ReusableWrapper = ({ children }) => (
  <div className="pr-17">
    <div className="position-relative">
      {children}
    </div>
  </div>
);

export const ReusableDropdown = ({ children, classNames }) => (
  <div className={`search-container ${classNames}`}>
    <div className="search-wrapper">
      <div className="suggestion-dropdown">
        {children}
      </div>
    </div>
  </div>
);

export const ReusableButton = ({ handleClick, children, classNames }) => (
  <div>
    <Button
      type="button"
      classNames={`current-location-button ${classNames}`}
      handleClick={handleClick}
    >
      {children}
    </Button>
  </div>
);

ReusableButton.defaultProps = {
  classNames: ''
};

ReusableButton.propTypes = {
  classNames: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

ReusableDropdown.defaultProps = {
  classNames: ''
};

ReusableDropdown.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

ReusableWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
