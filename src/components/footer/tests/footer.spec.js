import React from 'react';
import Footer from '../Footer';

describe('Footer component', () => {
  const wrapper = shallow(<Footer />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
