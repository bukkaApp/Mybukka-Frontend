/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import './Img.scss';
import { useCloudinayService } from './Cloudinary';

const Img = ({ src, className = '', options, fmt, alt }) => {
  const _imgRef = React.createRef();
  const { location: { pathname } } = useHistory();
  const [cookies, setCookie] = useCookies([`_${src}`]);
  const { domain, supports } = useCloudinayService();
  const [state, setState] = useState(false);
  const width = '600px';
  // Create an empty query string
  let queryString = '', ext = 'jpg';

  // If width is specified, otherwise use auto-detected width
  options.w = options.w || width;

  // If a format has not been specified, detect webp support
  if (!fmt && supports.webp) {
    ext = 'webp';
  }

  const handleScroll = () => {
    if (_imgRef.current && _imgRef.current.complete && !state) {
      setState(true);
      setCookie(`_${src}`, true, { path: pathname });
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [_imgRef]);

  const handleLoad = () => {
    setState(true);
    setCookie(`_${src}`, true, { path: pathname });
  };
  // Loop through option prop and build queryString
  Object.keys(options).map((option, i) => queryString += `${i < 1 ? '' : ','}${option}_${options[option]}`);

  const [storageClienId, imageInfoWithExt] = src.replace(domain, '').split('upload');
  const imageInfo = imageInfoWithExt.replace(/\.(jpe?g|gif|png|PNG|svg)$/, '');

  return (
    <div id="" className="Image-Opt-Wrapper">
      <img hidden ref={_imgRef} onLoad={handleLoad} alt={alt} src={`${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext}`} className="Image-Opt--none" />
      <div title={alt} className="Image-Opt--display" style={{ backgroundImage: `url(${`${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext}`})`, opacity: state || cookies[`_${src}`] ? 1 : 0 }} />
      <div className={`Image-Opt ${className}`} />
    </div>
  );
};

export default Img;
