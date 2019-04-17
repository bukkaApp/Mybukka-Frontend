import React from 'react';
import PropTypes from 'prop-types';
import CategoryCharges from './CategoryCharges';
import './lists.scss';

const Articles = ({ location }) => {
  const locationPathName = location.pathname;
  const covertPathNameToArray = locationPathName.split('/');
  const PageId = covertPathNameToArray[3];

  return (
    <div>
      <CategoryCharges id={PageId} />
    </div>
  );
};

export default Articles;

Articles.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string
    ])
  ).isRequired,
};
