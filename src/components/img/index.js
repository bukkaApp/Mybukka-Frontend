/* eslint-disable no-return-assign */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCloudinayService } from './Cloudinary';


const Img = (props) => {
  console.log('image compoonent ...');
  // Return the CDN domain from the CloudinaryProvider
  const { domain, supports } = useCloudinayService();
  const [state, setState] = useState({
    isInViewport: false,
    width: 0,
    height: 0,
    lqipLoaded: false,
    fullsizeLoaded: false
  });

  const imgRef = React.createRef();

  const _inViewport = () => {
    const windowHeight = window.innerHeight;
    const imageTopPosition = imgRef.current.getBoundingClientRect().top;

    const buffer = typeof props.buffer === 'number' && props.buffer > 1 && props.buffer < 10 ? props.buffer : 1.5;
    if (windowHeight * buffer > imageTopPosition) {
      return true;
    }
    return false;
  };

  const handleScroll = () => {
    if (imgRef.current && !state.lqipLoaded) {
      setState({
        ...state,
        isInViewport: _inViewport()
      });
    }
  };

  const handleResize = () => {
    if (imgRef.current) {
      const width = imgRef.current.clientWidth;
      const currentWidth = state.width;
      const difference = Math.abs(width - currentWidth);
      const differencePercentage = (difference / currentWidth) * 100;
      const isInViewpt = _inViewport();
      if (differencePercentage >= 10) {
        setState({
          ...state,
          width,
          lqipLoaded: false,
          fullsizeLoaded: isInViewpt,
          isInViewport: isInViewpt
        });
      }
    }
  };

  useEffect(() => {
    const width = imgRef.current.clientWidth;
    setState({
      ...state,
      width,
      isInViewport: _inViewport(),
    });
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('resize', handleResize);
    };
  }, [imgRef]);

  let styles = { // eslint-disable-line
    figure: {
      position: 'relative',
      margin: 0,
    },
    lqip: {
      width: '100%',
      //   filter: 'blur(5px)',
      opacity: 1,
      transition: 'all 0.5s ease-in'
    },
    fullsize: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      transition: 'all 0.5s ease-in'
    }
  };
  // Destructure props and state
  const { src, alt, options = {}, fmt } = props;
  let { ext = 'jpg' } = props;
  const { isInViewport, width, fullsizeLoaded } = state;

  // Create an empty query string
  let queryString = '';

  // If width is specified, otherwise use auto-detected width
  options.w = options.w || width;

  // If a format has not been specified, detect webp support
  if (!fmt && supports.webp) {
    ext = 'webp';
  }

  // Loop through option prop and build queryString
  Object.keys(options).map((option, i) => queryString += `${i < 1 ? '' : ','}${option}_${options[option]}`);

  // Modify the queryString for the LQIP image: replace the width param with a value 1/10 the fullsize
  let lqipQueryString = queryString.replace(`w_${width}`, `w_${Math.round(width * 0.1)}`);
  if (options.h) {
    lqipQueryString = lqipQueryString.replace(`h_${options.h}`, `h_${Math.round(options.h * 0.1)}`);
  }

  const [storageClienId, imageInfoWithExt] = src.replace(domain, '').split('upload');
  const imageInfo = imageInfoWithExt.replace(/\.(jpe?g|gif|png|PNG|svg)$/, '');
  // When the fullsize image is loaded, fade out the LQIP
  if (fullsizeLoaded) {
    styles.lqip.opacity = 0;
  }

  const missingALt = 'ALT TEXT IS REQUIRED';
  return (
    <figure
      style={styles.figure}
      ref={imgRef}
    >
      {
        //
        isInViewport && width > 0 ? (
          <React.Fragment>

            {/* Load fullsize image in background */}
            <img
              className={props.className}
              onLoad={() => { setState({ ...state, fullsizeLoaded: true }); }}
              style={styles.fullsize}
              src={`${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext}`}
              alt={alt || missingALt}
            />

            {/* Load LQIP in foreground */}
            <img
              className={props.className}
              onLoad={() => { setState({ ...state, lqipLoaded: true }); }}
              style={styles.lqip}
              src={`${domain}/${storageClienId}/upload/${lqipQueryString}/${imageInfo}.${ext}`}
              alt={alt || missingALt}
            />
          </React.Fragment>
        ) : null
      }
    </figure>
  );
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  ext: PropTypes.string,
  buffer: PropTypes.number
};

export default Img;
