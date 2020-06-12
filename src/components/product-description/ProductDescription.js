import React, { Fragment } from 'react';

import './ProductDescription.scss';

const ProductDescription = ({ desc, title, onClick }) => (
  <Fragment>
    <div
      className="ProductDescription-Icon"
      role="button"
      arai-pressed="false"
      tabIndex="0"
      onClick={() => onClick(false)}
    >
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <defs><path id="icon-close_svg__a" d="M0 1.5L1.5 0 8 6.5 14.5 0 16 1.5 9.5 8l6.5 6.5-1.5 1.5L8 9.5 1.5 16 0 14.5 6.5 8z" />
        </defs><use xlinkHref="#icon-close_svg__a" transform="translate(4 4)" />
      </svg>
    </div>
    <div className="ProductDescription">
      <h1 className="ProductDescription-Header">{title}</h1>
      <p className="ProductDescription-Head-Transparent">{desc}</p>
      <span className="ProductDescription-Head-Hint e3dzlyh0">
        <span>750 cal</span>
      </span>
    </div>
  </Fragment>
);

export default ProductDescription;
