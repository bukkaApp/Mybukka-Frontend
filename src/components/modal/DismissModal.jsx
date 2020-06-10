import React from 'react';

import PropTypes from 'prop-types';
import Cancel from '../icons/Cancel';
import ChevronRight from '../icons/ChevronRight';
import './DismissModal.scss';

/**
 * @function DismissModal
 * @param {*} param
 * @description
 * onClickBack - handleClick to go back to prevoius component
 * @returns {*} jsx
 */
const DismissModal = ({ withLeftIcon, classNames, onClick, onClickBack, withLeftIconOnly, toRight }) => (
  <React.Fragment>
    {(withLeftIcon || withLeftIconOnly) &&
    <div onClick={onClickBack} data-dismiss="modal" role="button" aria-pressed="false" tabIndex="0" className={`dismiss-modal Dismiss-Modal Dismiss-Modal--left ${classNames}`}>
      <div className="Rotate--Icon">
        <ChevronRight />
      </div>
    </div>}
    {!withLeftIconOnly &&
    <div data-dismiss="modal" role="button" aria-pressed="false" tabIndex="0" onClick={onClick} className={`dismiss-modal Dismiss-Modal ${toRight ? 'Dismiss-Modal--right' : ''} ${classNames}`} >
      <Cancel />
    </div>}
  </React.Fragment>
);

export default DismissModal;

DismissModal.defaultProps = {
  classNames: ''
};

DismissModal.propTypes = {
  classNames: PropTypes.string,
};
