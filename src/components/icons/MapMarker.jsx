import React from 'react';
import './icons.scss';

const MapMarker = () => (
  <svg width="14" height="17">
    <g fill="none" fillRule="evenodd">
      <path
        d="M7 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        fill="#8F95A3"
      />
      <path
        d="M7 16.362c4.35-3.483 6.5-6.616 6.5-9.362C13.5 3.324 10.638.5 7 .5A6.5 6.5 0 0 0 .5 7c0 2.746 2.15 5.879 6.5 9.362z" // eslint-disable-line
        stroke="#8F95A3"
      />
    </g>
  </svg>
);

export default MapMarker;
