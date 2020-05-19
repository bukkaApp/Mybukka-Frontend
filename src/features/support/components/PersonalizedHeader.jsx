import React from 'react';
import PropTypes from 'prop-types';
import NavLink from '../../../components/navlink/Navlink';

import './personalizedheader.scss';

const PersonalizedHeader = ({ title, className }) => (
  <div>
    <div className="personalized-header">
      <div className={`personalized-header-text ${className}`}>
        {title}
      </div>
      <NavLink
        classNames="personalized-header-link"
        href="/support/buyer"
      >
        <span>View all</span>
      </NavLink>
    </div>
    <div className="personalized-header-divider" />
  </div>

);

export default PersonalizedHeader;

PersonalizedHeader.defaultProps = {
  className: ''
};

PersonalizedHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};
