import React, { useState, useEffect } from 'react';
import ClickOut from '../ClickOut/ClickOut';

import './Modal.scss';

const Modal = ({
  children,
  useFullWidth,
  show,
  bodyClassName,
  classNames = '',
  onClickOut,
}) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    try {
      const timeout = setTimeout(() => {
        setState(show);
        return clearTimeout(timeout);
      }, 200);
    } catch (error) {
      console.log({ error });
    }
  }, [show]);

  return (
    <div>
      {show && (
        <div
          className={`Modal-Wrapper ${classNames} ${
            state ? 'Modal-Wrapper--active' : ''
          }`}
        >
          <ClickOut
            style={{ opacity: state ? 1 : 0 }}
            onClickOut={onClickOut}
            className={`Modal-Wrapper-Body ${bodyClassName} ${
              useFullWidth ? 'FullWidth' : 'MediumWidth'
            }`}
          >
            {children}
          </ClickOut>
        </div>
      )}
    </div>
  );
};

export default Modal;
