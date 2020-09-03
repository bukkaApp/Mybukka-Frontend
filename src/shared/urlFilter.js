const urlFilter = (url) => {
  // filter "/login?next=/support?cs_web_redirect=/buyer" or /login?next=/profile
  const urlStringToArr = url.split('=');
  if (urlStringToArr.length === 2) {
    return urlStringToArr[1];
  }
  urlStringToArr.shift();
  urlStringToArr[0] = urlStringToArr[0]
    .replace('?cs_web_redirect', '');
  const confirmedUrl = urlStringToArr.join('');
  return confirmedUrl;
};

export default urlFilter;
