import React from 'react';
import GoToLogin from '../common/GoToLogin';


describe('Go To Login component', () => {
  const props = {
    push: jest.fn(),
  };
  const wrapper = mount(<GoToLogin {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
