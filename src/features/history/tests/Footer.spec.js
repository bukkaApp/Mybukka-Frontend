import React from 'react';
import Footer from '../card/Footer';

describe('Card Footer component', () => {
  const props = {
    price: '2000.98',
    status: 'delivered'
  };

  const wrapper = mount(<Footer {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
