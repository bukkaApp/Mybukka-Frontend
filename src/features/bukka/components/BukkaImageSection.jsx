import React from 'react';
import PropTypes from 'prop-types';

import './bukkaImage.scss';

const BukkaImage = ({ imageUrl }) => (
  <div
    className="bukka-image-section"
    style={{ backgroundImage: `url(${imageUrl})` }}
  />
);

export default BukkaImage;

BukkaImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
