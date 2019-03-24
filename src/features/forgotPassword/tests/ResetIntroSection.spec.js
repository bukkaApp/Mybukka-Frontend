import React from 'react';
import ResetIntroSection from '../components/ResetIntroSection';


describe('Input field component', () => {
  const props = {
    sendARequestToChangePassword: jest.fn(),
    errorMessage: 'An error occur',
  };
  const wrapper = mount(<ResetIntroSection {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
