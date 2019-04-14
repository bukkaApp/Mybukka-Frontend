
const generateSmallScreenImageUrl = (imgUrl) => {
  const convertImageUrlToArray = imgUrl.split('/');
  const imageUrlLength = convertImageUrlToArray.length;
  const imageName = convertImageUrlToArray[imageUrlLength - 1];
  const imageId = convertImageUrlToArray[imageUrlLength - 2];
  const endUrlStr = `${imageId}/${imageName}`;
  const getBaseUrl = imgUrl.replace(endUrlStr, '');
  // getBaseUrl - http://www.url.com/
  const generateUrl = `${getBaseUrl}c_scale,w_320,h_320/${endUrlStr}`;
  return generateUrl;
};

export default generateSmallScreenImageUrl;
