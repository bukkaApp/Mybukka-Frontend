/**
 * @description - Validate if text is too short
 *
 * @exports validateSignUp
 *
 * @param  {string} param - param
 *
 * @param  {string} value - value
 *
 * @return {boolean} status - The status
 */
const trimWhiteSpaces = (param, value) => (param || '')
  .trim()
  .replace(/\s+/g, value || '');


/**
 * @description - Validate if text is too short
 *
 * @exports validateSignUp
 *
 * @param  {string} el - el
 *
 * @return {boolean} status - The status
 */
const isTextTooShort = el => trimWhiteSpaces(el.value).length
< el.elementConfig.minLength;


/**
 * @description - Validate if Request met requirement
 *
 * @exports validateSignUp
 *
 * @param  {Object} request - request
 *
 * @return {boolean} status - The status
 */
const validateRequest = (request) => {
  const pattern = /\S{3,}@\S{2,}\.\S{2,}/;
  const namePattern = /^[a-z]*$/gi;
  const passPattern = /[a-z][0-9]/gi;
  const whiteSpace = /\s/gi;
  const length = request.elementConfig.minLength;
  // validate datas but not email
  if (request.elementConfig.minLength) {
    if (length === 3 && !isTextTooShort(request)
    && namePattern.test(request.value)) {
      request.match = true;
      // validate password
    } else if (length === 8 && !isTextTooShort(request)
    && passPattern.test(request.value) && !whiteSpace.test(request.value)) {
      request.match = true;
    } else { request.match = false; }
    // validate email
  } else if (!request.elementConfig.minLength) {
    if (pattern.test(request.value)) {
      request.match = true;
    } else { request.match = false; }
  }
};


/**
 * @description - Validate if Request met requirement
 *
 * @exports validateSubmitButton
 *
 * @param  {Object} userData - userData
 *
 * @return {boolean} status - The status
 */
const validateSubmitButton = (userData) => {
  let formIsValid = true;
  let confirmPass = false;
  // eslint-disable-next-line array-callback-return
  Object.keys(userData).map((el) => {
    if (userData.confirmPassword) {
      confirmPass = userData.password.value === userData.confirmPassword.value;
      userData.confirmPassword.match = confirmPass;
    }
    formIsValid = userData[el].match && formIsValid;
  });
  return formIsValid;
};

module.exports = { validateRequest, validateSubmitButton };
