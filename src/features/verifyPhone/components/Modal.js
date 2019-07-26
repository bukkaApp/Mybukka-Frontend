import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop';

import './modal.scss';

const Modal = ({ open, handleClose, children }) => {
  const showHideClassName = open
    ? 'modal modal-section__custom modal-display__block'
    : 'modal modal-section__custom modal-display__none';

  const backdrop = open ? <Backdrop click={() => {}} /> : null;

  return (
    <div className={showHideClassName}>
      <section className="modal-section__main">
        <div className="modal-section__body">
          <div className="modal-body__content">
            <div
              role="button"
              tabIndex={0}
              className="modal-close-btn"
              onClick={handleClose}
            >
              <span className="close" />
            </div>
            {children}
          </div>
        </div>
      </section>
      {backdrop}
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
