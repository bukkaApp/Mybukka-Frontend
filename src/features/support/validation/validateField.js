import Validator from 'validatorjs';

const rules = {
  firstName: 'required|alpha',
  lastName: 'required|alpha',
  email: 'required|email',
  name: 'required|string',
  content: 'required|string',
  category: 'required|string',
  subCategory: 'required|string',
  imageUrl: 'string',
};

const errorMessages = {
  required: 'this field is required',
  alpha: 'this field can only be letters',
  email: 'your email is not valid',
  string: 'this field should be a string',
};

/**
 *
 * @param {object} data containing key:value pairs
 * of field and value to be validated
 * @param {string} field field in rules to run validation against
 * @param {boolean} useSignInRules use SignIn Rules
 * @returns {object} containing key:value pairs of a field:errormessage
 */
export const validateAField = (data, field) => {
  const validation = new Validator(data, rules, errorMessages);
  validation.passes();
  let firstError = validation.errors.first(field);
  if (firstError === false) firstError = '';
  return {
    message: firstError,
  };
};

/**
 *
 * @param {object} data object to run rules against
 * @param {boolean} useSignInRules use signIn Rules
 * @returns {object} containing keys:value pair of field:errormessage
 *
 */
export const validateAllFields = (data) => {
  const validation = new Validator(data, rules, errorMessages);
  validation.passes();
  const errors = validation.errors.all();
  Object.keys(errors).forEach((errorKey) => {
    // reassigns the key to a destructured
    // version of the error message
    [errors[errorKey]] = errors[errorKey];
  });
  return { errors, passes: validation.passes() };
};
