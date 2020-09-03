export default {
  firstName: {
    value: '',
    type: 'text',
    placeholder: 'First Name',
    minLength: 3,
    errorMsg: {
      empty: 'This field is Required',
      invalid: 'This field can only be at least 3 letters'
    },
    touched: false,
    match: false,
    isSuccess: false
  },
  lastName: {
    value: '',
    type: 'text',
    placeholder: 'Last Name',
    minLength: 3,
    errorMsg: {
      empty: 'This field is Required',
      invalid: 'This field can only be at least 3 letters'
    },
    touched: false,
    match: false,
    isSuccess: false
  },
  email: {
    value: '',
    type: 'email',
    placeholder: 'Email address',
    errorMsg: {
      empty: 'This field is Required',
      invalid: 'Email must be valid'
    },
    touched: false,
    match: false,
    isSuccess: false
  },
  password: {
    value: '',
    type: 'password',
    placeholder: ' Password ',
    minLength: 8,
    errorMsg: {
      empty: 'This field is Required',
      invalid: 'This field should contain at least 8 alphabets and numbers'
    },
    touched: false,
    match: false,
    isSuccess: false
  },
  confirmPassword: {
    value: '',
    type: 'password',
    placeholder: ' Re-type Password',
    minLength: 8,
    errorMsg: {
      empty: 'This field is Required',
      invalid: 'This field must be the same with password'
    },
    touched: false,
    match: false,
    isSuccess: false
  },
  domStructureMock: [
    {
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name',
      id: 'firstName'
    },
  ],
  validationErrorsMock: {
    firstName: ''
  },
};
