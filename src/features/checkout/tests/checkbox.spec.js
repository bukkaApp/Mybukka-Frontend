import React from 'react';

import CheckBoxBtn from '../common/checkbox';

describe('Area to explore component', () => {
  const wrapper = mount(<CheckBoxBtn />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
