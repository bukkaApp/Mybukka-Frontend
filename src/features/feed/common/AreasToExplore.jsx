import React from 'react';
import PropTypes from 'prop-types';

import Container from 'Components/container';

import './areastoexplore.scss';

const LargeTextSection = ({ text }) => (
  <div className="intro-text-section">
    <h1 className="large-custom-text-container">
      <span className="large-custom-text">{text}.</span>
      <span className="large-custom-text">We get it.</span>
    </h1>
  </div>
);

const HeaderImageSection = ({ bgImage }) => (
  <div className="header-img-section">
    <div>
      <img src={`${bgImage}`} alt="bgImage" />
      <div
        className="feed-header-bg-img"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 1 }}
      />
    </div>
  </div>
);

const AreasToExplore = ({ bgImage, text }) => (
  <div className="feed-header">
    <Container classNames="feed-header-content">
      <HeaderImageSection bgImage={bgImage} />
      <LargeTextSection text={text} />
    </Container>
  </div>
);

export default AreasToExplore;

HeaderImageSection.propTypes = {
  bgImage: PropTypes.string.isRequired
};

LargeTextSection.propTypes = {
  text: PropTypes.string.isRequired
};

AreasToExplore.defaultProps = {
  text: 'You Crave'
};

AreasToExplore.propTypes = {
  bgImage: PropTypes.string.isRequired,
  text: PropTypes.string
};
