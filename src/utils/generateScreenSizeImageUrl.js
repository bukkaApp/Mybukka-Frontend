// 320
const generateScreenSizeImageUrl = (imgUrl, size, mode = 'scale') => {
  const splitedUrl = imgUrl.split('/upload/');
  const getBaseUrl = splitedUrl[0];
  const endUrlStr = splitedUrl[1];
  // getBaseUrl - http://www.url.com/
  const generatedUrl = typeof size === 'string' ?
    `${getBaseUrl}/upload/c_${mode},w_${size},h_${size}/${endUrlStr}`
    : `${getBaseUrl}/upload/c_${mode},w_${size[0]}/${endUrlStr}`;
  return generatedUrl;
};
export default generateScreenSizeImageUrl;
