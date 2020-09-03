import React from 'react';
import AuthButton from '../common/AuthButton';


describe('AuthButton component', () => {
  const props = {
    isFormCompleted: true,
  };
  const wrapper = mount(<AuthButton {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
