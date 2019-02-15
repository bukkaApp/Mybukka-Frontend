import React from 'react';
import BukkaImageSection from '../components/BukkaImageSection';

describe('BukkaImageSection Component', () => {
  const props = {
    imageUrl: 'http://some-img-url',
  };

  const wrapper = mount(<BukkaImageSection {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
