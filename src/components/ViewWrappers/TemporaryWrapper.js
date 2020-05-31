import React from 'react';

const ViewWrapper = ({ children, noPadding }) => (
  <div className={`${noPadding ? '' : 'px-3'} px-md-3 px-lg-0 mb-2 mt-4`}>{children}</div>
);

const ViewHeading = ({ text = 'Payment', classNames, noPadding }) => (
  <h2 className={`${noPadding ? '' : 'px-3'} font-size-16 px-md-3 px-lg-0 ${classNames || ''}`}>{text}</h2>
);

export default { ViewWrapper, ViewHeading };
