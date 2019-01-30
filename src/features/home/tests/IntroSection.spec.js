import React from 'react';

import IntroSection
  from '../components/IntroSection';

describe('Area to explore component', () => {
  const wrapper = shallow(<IntroSection />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
