import React from 'react';
import PropTypes from 'prop-types';

import './Headline.scss';

const runnerWidth = 32;
const maxWidth = 100 - runnerWidth;

const Headline = ({ title, numberOfViews, slidesLength, activeIndex }) => {
  // const translate = activeIndex >= 1 ? maxWidth / (slidesLength - 2) : 0;
  const calc = (100 / slidesLength) * activeIndex;
  // (96.8 * activeIndex) / slidesLength;
  // const left = (activeIndex / slidesLength) * maxWwidth;
  // const left = activeIndex / slidesLength * maxWwidth;
  return (
    <div className="headline ml-3 mr-3">
      <div className="runner" style={{ transform: `translateX(${calc}% - 32px)` }} />
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
