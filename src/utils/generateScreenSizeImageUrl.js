// 320
const generateScreenSizeImageUrl = (imgUrl, size) => {
  const convertImageUrlToArray = imgUrl.split('/');
  const imageUrlLength = convertImageUrlToArray.length;
  const imageName = convertImageUrlToArray[imageUrlLength - 1];
  const imageId = convertImageUrlToArray[imageUrlLength - 2];
  const endUrlStr = `${imageId}/${imageName}`;
  const getBaseUrl = imgUrl.replace(endUrlStr, '');
  // getBaseUrl - http://www.url.com/
  const generatedUrl = `${getBaseUrl}c_scale,w_${size},h_${size}/${endUrlStr}`;
  return generatedUrl;
};

export default generateScreenSizeImageUrl;
