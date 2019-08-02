// 320
const generateScreenSizeImageUrl = (imgUrl, size) => {
  const splitedUrl = imgUrl.split('/upload');
  const getBaseUrl = splitedUrl[0];
  const endUrlStr = splitedUrl[1];
  // getBaseUrl - http://www.url.com/
  const generatedUrl = `${getBaseUrl}/upload/c_scale,w_${size},h_${size}/${endUrlStr}`;
  return generatedUrl;
};
export default generateScreenSizeImageUrl;
