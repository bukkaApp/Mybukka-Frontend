import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './navlink.scss';

const Navlink = ({ text, onClick, href, classNames, children, styles }) => (
  <Link to={href} onClick={onClick} className={classNames} style={styles}>
    {text || children}
  </Link>
);

export default Navlink;

Navlink.defaultProps = {
  children: '',
  text: '',
  onClick: () => {},
  classNames: ''
};

Navlink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  children: PropTypes.node,
};
