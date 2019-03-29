import React from 'react';
import ForgotPassword from '../common/ForgotPassword';


describe('Input field component', () => {
  const props = {
    handleForgotPassword: jest.fn(),
  };
  const wrapper = mount(<ForgotPassword {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
