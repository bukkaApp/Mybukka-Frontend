import Validator from 'validatorjs';

const rules = {
  contactMobile: 'required|numeric',
  code: 'required|numeric',
};

const verifyMobileRules = {
  contactMobile: 'required|numeric',
};

export const verifyCodeRules = {
  code: 'required|numeric',
};

const errorMessages = {
  required: 'this field is required',
  alpha: 'this field can only be letters',
  numeric: 'this field can only be numbers',
  email: 'your email is not yet valid',
};

/**
 *
 * @param {object} data containing key:value pairs
 * of field and value to be validated
 * @param {string} field field in rules to run validation against
 * @param {boolean} verify use Verify Rules
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
 * @param {boolean} verify use Verify Rules
 * @returns {object} containing keys:value pair of field:errormessage
 *
 */
export const validateAllFields = (data, verify) => {
  const changedRules = verify ? verifyMobileRules : verifyCodeRules;
  const validation = new Validator(data, changedRules, errorMessages);
  validation.passes();
  const errors = validation.errors.all();
  Object.keys(errors).forEach((errorKey) => {
    // reassigns the key to a destructured
    // version of the error message
    [errors[errorKey]] = errors[errorKey];
  });
  return { errors, passes: validation.passes() };
};
