import React from 'react';
import CreateAccount from '../common/CreateAccount';


describe('Create Account component', () => {
  const props = {
    push: jest.fn(),
  };
  const wrapper = mount(<CreateAccount {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
