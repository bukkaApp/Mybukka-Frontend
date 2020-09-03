import React from 'react';


import IntroSection from '../common/IntroSection';

describe('IntroSection FeedPage component', () => {
  const wrapper = shallow(<IntroSection push={jest.fn()} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
