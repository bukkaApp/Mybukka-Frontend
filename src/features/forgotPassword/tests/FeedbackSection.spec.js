import React from 'react';
import FeedbackSection from '../components/FeedbackSection';


describe('Input field component', () => {
  const props = {
    push: jest.fn()
  };
  const wrapper = shallow(<FeedbackSection {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
