import React from 'react';
import AuthResetForm from '../components/AuthResetForm';
import Data from './__mocks__/register';

describe('AuthResetForm component', () => {
  const props = {
    instruction: 'Login in password',
    title: 'Sign Up',
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    domStructure: Data.domStructureMock,
    validationErrors: Data.validationErrorsMock,
    isFormCompleted: true,
    type: 'signin',
    errorMessage: 'An Error occur'
  };
  const wrapper = shallow(<AuthResetForm {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
