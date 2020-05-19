import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import Container from 'Components/container';

import './areastoexplore.scss';
import { useCloudinayService } from '../../../components/img/Cloudinary';

const LargeTextSection = ({ text }) => (
  <div className="intro-text-section">
    <h1 className="large-custom-text-container">
      <span className="large-custom-text">{text}.</span>
      <span className="large-custom-text">We get it.</span>
    </h1>
  </div>
);

const HeaderImageSection = ({ bgImage }) => {
  const [cookies, setCookie] = useCookies([`_${bgImage}`]);
  const { domain, supports } = useCloudinayService();
  const [state, setState] = useState(false);
  let ext = 'jpg';

  // If a format has not been specified, detect webp support
  if (supports.webp) {
    ext = 'webp';
  }

  const handleLoad = () => {
    setState(true);
    setCookie(`_${bgImage}`, true, { path: '/' });
  };

  const [storageClienId, imageInfoWithExt] = bgImage.replace(domain, '').split('upload');
  const imageInfo = imageInfoWithExt.replace(/\.(jpe?g|gif|png|PNG|svg)$/, '');

  return (
    <div className="header-img-section">
      <div>
        <img onLoad={handleLoad} src={`${`${domain}${storageClienId}upload${imageInfo}.${ext}`}`} alt="bgImage" />
        <div
          className="feed-header-bg-img"
          style={{ backgroundImage: `url(${domain}${storageClienId}upload${imageInfo}.${ext})`, opacity: state || cookies[`_${bgImage}`] ? 1 : 0 }}
        />
      </div>
    </div>
  );
};

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
