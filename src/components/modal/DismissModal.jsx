import React from 'react';

import PropTypes from 'prop-types';
import Cancel from '../icons/Cancel';
import './DismissModal.scss';

const DismissModal = ({ withRightIcon, classNames, onClick }) => (
  <div data-dismiss="modal" role="button" aria-pressed="false" tabIndex="0" onClick={onClick} className={`dismiss-modal Dismiss-Modal ${withRightIcon ? 'Dismiss-Modal--right' : ''} ${classNames}`} >
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
