import React from 'react';

const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <g fill="#9c1c26" fillRule="evenodd">
      <path d="M0 7h16v2H0z" />
      <path d="M7 16V0h2v16z" />
    </g>
  </svg>
);

export default Plus;

export const RoundedPlus = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    className="css-1ay9vb9 eknoyc20"
  >
    <g fill="none" fillRule="evenodd">
      <path
        d="M1 13c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12C6.372 1 1 6.372 1 13z"
        stroke="#DDD"
      />
      <path d="M12 12H9v2h3v3h2v-3h3v-2h-3V9h-2v3z" fill="#222" />
    </g>
  </svg>
);

export const BasicPlus = () => (
  <svg
    width="32"
    height="20"
    viewBox="0 0 32 20"
    className="css-1ay9vb9 e1oz2jko0"
  >
    <g transform="translate(0 -6)" fill="none" fillRule="evenodd">
      <rect
        stroke="#DDD"
        strokeWidth=".5"
        x=".25"
        y="6.25"
        width="31.5"
        height="19.5"
        rx="3"
      />
      <path d="M15 15h-3v2h3v3h2v-3h3v-2h-3v-3h-2v3z" fill="#222" />
    </g>
  </svg>
);
