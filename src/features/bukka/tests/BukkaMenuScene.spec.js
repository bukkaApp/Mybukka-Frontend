import React from 'react';
import BukkaMenu from '../components';

describe('BukkaMenu scene', () => {
  const wrapper = shallow(<BukkaMenu />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
