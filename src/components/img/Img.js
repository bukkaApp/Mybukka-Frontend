/* eslint-disable no-return-assign */
import React, { useEffect } from 'react';

import { useCloudinayService } from './Cloudinary';
import { useImagesContext } from '../../context/ImagesContext';
import './Img.scss';

const Img = ({ src, className = '', options, fmt, alt, useBeta }) => {
  const imgRef = React.useRef();
  const { domain, supports } = useCloudinayService();
  const [state, setState] = useImagesContext();
  const width = '600px';
  // Create an empty query string
  let queryString = '', ext = 'jpg';

  // If width is specified, otherwise use auto-detected width
  options.w = options.w || width;

  // If a format has not been specified, detect webp support
  if (!fmt && supports.webp) {
    ext = 'webp';
  }

  // const handleScroll = () => {
  //   if (imgRef.current && imgRef.current.complete && !state[`__${src}__`]) {
  //     setState(`__${src}__`);
  //   }
  // };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && !state[`__${src}__`]) {
      setState(`__${src}__`);
    }
    // document.addEventListener('scroll', handleScroll);
    // return () => document.removeEventListener('scroll', handleScroll);
  }, [imgRef]);

  // Loop through option prop and build queryString
  Object.keys(options).map((option, i) => queryString += `${i < 1 ? '' : ','}${option}_${options[option]}`);

  const [storageClienId, imageInfoWithExt] = src.replace(domain, '').split('upload');
  const imageInfo = imageInfoWithExt.replace(/\.(jpe?g|gif|png|PNG|svg)$/, '');

  return (
    <div id="" className="Image-Opt-Wrapper">
      <img ref={imgRef} hidden onLoad={() => setState(`__${src}__`)} alt={alt} src={`${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext}`} className="Image-Opt--none" />
      <div title={alt} className="Image-Opt--display" style={{ backgroundImage: `url(${`${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext}`})`, opacity: state[`__${src}__`] ? 1 : 0 }} />
      <div className={`Image-Opt ${className}`} />
      {(useBeta && state[`__${src}__`]) && <span className="Image-Opt-Beta">beta</span>}
    </div>
  );
};

export default Img;
