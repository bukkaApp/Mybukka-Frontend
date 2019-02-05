import React from 'react';

import PropTypes from 'prop-types';
import Cancel from '../icons/Cancel';

const DismissModal = ({ classNames }) => (
  <div data-dismiss="modal" className={`dismiss-modal ${classNames}`} >
    <Cancel />
  </div>
);

export default DismissModal;

DismissModal.defaultProps = {
  classNames: ''
};

DismissModal.propTypes = {
  classNames: PropTypes.string,
};
