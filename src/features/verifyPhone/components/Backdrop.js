import React from 'react';
import PropTypes from 'prop-types';

import './backdrop.scss';

const Backdrop = ({ click }) => (
  <div tabIndex="0" role="button" onKeyPress={() => {}} className="new-backdrop" onClick={click} />
);

Backdrop.propTypes = {
  click: PropTypes.func.isRequired,
};

export default Backdrop;
