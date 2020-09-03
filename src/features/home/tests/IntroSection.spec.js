import React from 'react';

import IntroSection
  from '../components/IntroSection';

describe('Area to explore component', () => {
  const wrapper = shallow(<IntroSection push={jest.fn()} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
