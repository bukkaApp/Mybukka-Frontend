import React from 'react';

import PropTypes from 'prop-types';

import './exploresection.scss';

const ExploreSection = ({ children, classNames }) => (
  <section className={`feed-main-section ${classNames}`}>
    {children}
  </section>
);

export default ExploreSection;

ExploreSection.defaultProps = {
  classNames: ''
};

ExploreSection.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
