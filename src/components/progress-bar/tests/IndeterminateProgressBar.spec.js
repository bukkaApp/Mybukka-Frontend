import React from 'react';
import IndeterminateProgressbar from '../IndeterminateProgressbar';

describe('Indeterminate progress bar', () => {
  const wrapper = shallow(<IndeterminateProgressbar loading />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
