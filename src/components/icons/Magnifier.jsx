/* eslint-disable react/prop-types */
import React from 'react';

/**
 * @description Magnifier
 * @function Magnifier
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const Magnifier = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" className="magnifier">
    <defs>
      <path d="M11.75 10.335l3.32 3.322-1.413 1.414-3.322-3.32A6.48 6.48 0 0 1 6.5 13a6.5 6.5 0 1 1 5.25-2.665zM6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" id="icon-search_svg__a" />
    </defs>
    <use fill="currentColor" opacity=".9" xlinkHref="#icon-search_svg__a" fillRule="evenodd" />
  </svg>
);

export default Magnifier;
