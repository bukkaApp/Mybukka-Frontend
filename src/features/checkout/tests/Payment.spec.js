import React from 'react';

import Payment
  from '../components/Payment';

describe('Area to explore component', () => {
  const props = {
    handleClick: jest.fn(),
    handleChange: jest.fn()
  };
  const wrapper = mount(<Payment {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
