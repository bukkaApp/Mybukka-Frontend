import React from 'react';
import BukkaInfoDropdownSection from '../components/BukkaInfoDropdownSection';

describe('Bukka Info Section', () => {
  const wrapper = mount(<BukkaInfoDropdownSection />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
