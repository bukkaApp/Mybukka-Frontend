// 320
const generateScreenSizeImageUrl = (src, size, mode = 'scale', ext = 'jpg') => {
  const domain = 'https://res.cloudinary.com';
  if (!ext) ext = src.split('.').pop();
  if (src) {
    const [storageClienId, imageInfoWithExt] = src.replace(domain, '').split('upload');
    const imageInfo = imageInfoWithExt.replace(/\.(jpe?g|gif|png|PNG|svg|webp)$/, '');
    // getBaseUrl - http://www.url.com/
    // const generatedUrl = typeof size === 'string' ?
    if (typeof size === 'string') {
      return `${domain}${storageClienId}upload/c_${mode},w_${size},h_${size}${imageInfo}.${ext}`;
    }
    return `${domain}${storageClienId}upload/c_${mode},w_${size[0]}${imageInfo}.${ext}`;
  }
};
export default generateScreenSizeImageUrl;
