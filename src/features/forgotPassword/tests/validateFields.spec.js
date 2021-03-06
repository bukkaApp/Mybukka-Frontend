import { validateAField, validateAllFields } from '../helper/validateFields';

describe('Validations test-suite', () => {
  describe('validateAField test-suite', () => {
    it(`returns a key:value message:error-message
    pair of error message`, () => {
      validateAField('hgy', 'email');
      expect(validateAField('   ', 'email', true)).toEqual({
        message: 'this field is required'
      });
    });

    it(`returns a key:value message:error-message
    pair of error message`, () => {
      validateAField('hgy', 'password');
      expect(validateAField('   ', 'password')).toEqual({
        message: 'this field is required'
      });
    });
  });

  describe('validateAllFields test-suite', () => {
    it(`returns object containing key:value
    pairs of all error messages`, () => {
      const data = {
        email: 'you',
      };
      expect(validateAllFields(data, true)).toEqual({
        errors: {
          email: 'your email is not yet valid'
        },
        passes: false,
      });
    });

    it(`validates if the confirmpassword field is
    equal to the password field`, () => {
      const data = {
        password: 'nonono',
        confirmPassword: 'yesyes'
      };
      expect(validateAllFields(data).errors.confirmPassword).toEqual(
        'this value does not match the password'
      );
    });
  });
});
