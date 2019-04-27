import React from 'react';
import PropTypes from 'prop-types';
import Container from 'Components/container/Container';

import './Headline.scss';


const Headline = ({ title, numberOfViews, slidesLength, activeIndex }) => {
  const calc = (100 / slidesLength) * activeIndex;
  return (
    <Container>
      <div className="headline">
        <div
          className="runner"
          style={{ transform: `translateX(${calc}% - 32px)` }}
        />
        <h2 className="headline-h2">{title}</h2>
        {numberOfViews && (
          <a className="headline-link" href="/" rel="nofollow">
            <span className="d-none pr-3 d-sm-inline-flex">
            View all {numberOfViews}
            </span>
            <i className="fas fa-chevron-right" />
          </a>
        )}
      </div>
    </Container>
  );
};

export default Headline;

Headline.defaultProps = {
  numberOfViews: null,
  slidesLength: 1,
};

Headline.propTypes = {
  numberOfViews: PropTypes.number,
  title: PropTypes.string.isRequired,
  slidesLength: PropTypes.number,
  activeIndex: PropTypes.number.isRequired
};
