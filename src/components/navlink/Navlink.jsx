import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './navlink.scss';

const Navlink = ({ text, onClick, href, classNames, children }) => (
  <Link to={href} onClick={onClick} className={classNames}>
    {text || children}
  </Link>
);

export default Navlink;

Navlink.defaultProps = {
  children: '',
  text: '',
  onClick: () => {}
};

Navlink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  children: PropTypes.node,
};
