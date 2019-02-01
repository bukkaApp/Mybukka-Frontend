import React from 'react';
import Authorisation from '../components/Authentication';


describe('authorisation component', () => {
  const props = {
    title: 'Sign Up',
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    isFormCompleted: true,
    type: 'signin'
  };
  const wrapper = shallow(<Authorisation {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
