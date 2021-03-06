import Validator from 'validatorjs';

const rules = {
  firstName: 'required|alpha',
  lastName: 'required|alpha',
  email: 'required|email',
  password: 'required|alpha|min:8'
};

const errorMessages = {
  required: 'this field is required',
  alpha: 'this field can only be letters',
  email: 'your email is not yet valid',
};

/**
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

export default validateAField;
