import React from 'react';
import { useSessionStorage } from '../../hooks/useSession';
import { useCloudinayService } from '../../components/img/Cloudinary';

const altSrc = 'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png';

const SingleImage = ({ src, srcSet = altSrc, options, className, alt, name, ...props }) => {
  const { domain, supports } = useCloudinayService();
  const [state, setState] = useSessionStorage(name || alt, false);

  // Create an empty query string
  let queryString = '', ext = 'jpg';

  // If a format has not been specified, detect webp support
  if (supports.webp) {
    ext = 'webp';
  }

  Object.keys(options).map((option, i) => {
    queryString += `${i < 1 ? '' : ','}${option}_${options[option]}`;
    return true;
  });

  const [storageClienId, imageInfoWithExt] = (src && src.replace(domain, '').split('upload')) || srcSet;
  const imageInfo = imageInfoWithExt.replace(/\.(jpe?g|gif|png|PNG|svg|webp)$/, '');

  const newProps = { ...props };
  delete newProps.style;

  return (
    <React.Fragment>
      <img onLoad={() => setState(true)} hidden src={`${`${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext}`}`} alt={alt || 'alt'} />
      <div
        {...newProps}
        className={`img-fluid ${className || ''}`}
        style={{ ...props.style, margin: 'auto', backgroundImage: `url(${domain}${storageClienId}upload/${queryString}${imageInfo}.${ext})`, opacity: state ? 1 : 0 }}
      />
    </React.Fragment>
  );
};

export default SingleImage;
