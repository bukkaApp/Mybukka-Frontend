import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Checkout
  from '../components/Checkout';

describe('Area to explore component', () => {
  const wrapper = mount(<MemoryRouter><Checkout /></MemoryRouter>);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
