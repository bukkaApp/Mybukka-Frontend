import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './navlink.scss';

const Navlink = ({ text, href, classNames }) => (
  <Link to={href} className={classNames}>
    {text}
  </Link>
);

export default Navlink;

Navlink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
};
