import React from 'react';

import PropTypes from 'prop-types';
import Cancel from '../icons/Cancel';

const DismissModal = ({ classNames, onClick }) => (
  <div data-dismiss="modal" role="button" aria-pressed="false" tabIndex="0" onClick={onClick} className={`dismiss-modal ${classNames}`} >
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
