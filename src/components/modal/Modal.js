import React, { useState, useEffect } from 'react';
import './Modal.scss';

const Modal = React.forwardRef(({ children, useFullWidth, show, bodyClassName, classNames = '' }, ref) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(show);
    }, 200);
    return () => clearTimeout(timeout);
  });

  return (
    <div>
      {show && <div className={`Modal-Wrapper ${classNames} ${state ? 'Modal-Wrapper--active' : ''}`}>
        <div style={{ opacity: state ? 1 : 0 }} ref={ref} className={`Modal-Wrapper-Body ${bodyClassName} ${useFullWidth ? 'FullWidth' : 'MediumWidth'}`}>
          {children}
        </div>
      </div>}
    </div>
  );
});


export default Modal;
