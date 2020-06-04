import React, { useRef, useEffect } from 'react';

const ClickOut = ({
  children,
  onClickOut,
  ...props,
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOut = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOut(event);
      }
    };

    document.addEventListener('mousedown', handleClickOut);
    return () => document.removeEventListener('mousedown', handleClickOut);
  }, [onClickOut]);

  return (
    <div {...props} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ClickOut;
