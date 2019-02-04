import React from 'react';
import PropTypes from 'prop-types';
import './Headline.scss';

// max view port width
const maxWidth = 77.8;

const Headline = ({ title, NumberOfViews, slidesLenght, activeIndex }) => {
  const translate = activeIndex >= 1 ? maxWidth / (slidesLenght - 2) : 0;
  return (
    <div className="headline">
      <div
        className="runner"
        style={{ transform: `translateX(${activeIndex * translate}vw)` }}
      />
      <h2 className="headline-h2">{ title }</h2>
      { NumberOfViews
          && <a className="headline-link" href="/" rel="nofollow">
            <span>View all <span>{NumberOfViews} </span> </span>
            <i className="fas fa-chevron-right" />
          </a>
      }
    </div>
  );
};

export default Headline;

Headline.propTypes = {
  NumberOfViews: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  slidesLenght: PropTypes.number.isRequired,
  activeIndex: PropTypes.string.isRequired
};
