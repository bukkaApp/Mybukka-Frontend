import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ color }) => {
  const dColor = color || '#2C2C2C';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12">
      <path d="M.5 0h8v2.121h-8V0zm0 3.182h8v2.121h-8V3.182zM9.5 0h5v5.303h-5V0zm-9 6.364h8v2.12h-8v-2.12zm0 3.181h8v2.122h-8V9.545zm9-3.181h5v5.303h-5V6.364z" fill={`${dColor}`} fillRule="evenodd" />
    </svg>
  );
};

export default Menu;

Menu.defaultProps = {
  color: ''
};

Menu.propTypes = {
  color: PropTypes.string
};
