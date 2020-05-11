import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './bukkaImage.scss';

const BukkaImage = ({ imageUrl }) => (
  <div
    className="bukka-image-section"
    style={{ backgroundImage: `url(${imageUrl})` }}
  />
);

const mapStateToProps = ({
  businessReducer: {
    fetchedBukka: { imageUrl }
  }
}) => ({
  imageUrl
});

export default connect(
  mapStateToProps,
  null
)(BukkaImage);

BukkaImage.propTypes = {
  imageUrl: PropTypes.string.isRequired
};
