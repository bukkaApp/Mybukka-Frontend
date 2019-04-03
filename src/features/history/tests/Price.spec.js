import React from 'react';
import Price from '../common/Price';

describe('Price component', () => {
  const props = {
    price: '20000'
  };

  const wrapper = mount(<Price {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
