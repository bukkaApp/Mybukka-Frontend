import React from 'react';
import './MealImage.scss';
import { useCloudinayService } from '../../img/Cloudinary';

const MealImage = ({ imageUrl, toggleAddToCart }) => {
  const { domain, supports } = useCloudinayService();
  let ext = 'jpg', queryString = '';
  const lqh = 120;// low quality height
  const options = {
    h: 640, // height
    w: 'auto', // width
    q: 85, // quality
    c: 'scale' // mode
  };

  const [storageClienId, imgSrc] = imageUrl.replace(domain, '').split('upload');
  const imgSrcWithoutExt = imgSrc.replace(/\.(jpe?g|gif|png|PNG|svg|webp)$/, '');

  // Loop through option prop and build queryString
  Object.keys(options).map((option, i) => queryString += `${i < 1 ? '' : ','}${option}_${options[option]}`); // eslint-disable-line

  const lqipQueryString = queryString.replace(`h_${options.h}`, `h_${lqh}`);

  // If a format has not been specified, detect webp support
  if (supports.webp) {
    ext = 'webp';
  }

  return (
    <div id="" className="Meal-Image">
      <div>
        <img alt={imgSrcWithoutExt.split('/')[1]} src={`${domain}${storageClienId}upload/${lqipQueryString}${imgSrcWithoutExt}.${ext}`} className="MealImage-Invisible" />
        <img alt={imgSrcWithoutExt.split('/')[1]} src={`${domain}${storageClienId}upload/${queryString}${imgSrcWithoutExt}.${ext}`} className="MealImage-Invisible" />
        <div title={imgSrcWithoutExt.split('/')[1]} className="MealImage-Visible-Filter" style={{ backgroundImage: `url(${domain}${storageClienId}upload/${lqipQueryString}${imgSrcWithoutExt}.${ext})`, opacity: 1 }} />
        <div title={imgSrcWithoutExt.split('/')[1]} className="MealImage-Visible" style={{ backgroundImage: `url(${domain}${storageClienId}upload/${queryString}${imgSrcWithoutExt}.${ext})`, opacity: 1 }} />
      </div>
      <div className="MealImage-Resize" />
      <div
        className="MealImage-Left-Icon"
        role="button"
        arai-pressed="false"
        tabIndex="0"
        onClick={() => toggleAddToCart(false)}
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <defs><path id="icon-close_svg__a" d="M0 1.5L1.5 0 8 6.5 14.5 0 16 1.5 9.5 8l6.5 6.5-1.5 1.5L8 9.5 1.5 16 0 14.5 6.5 8z" /></defs>
          <use xlinkHref="#icon-close_svg__a" transform="translate(4 4)" />
        </svg>
      </div>
    </div>
  );
};
export default MealImage;
