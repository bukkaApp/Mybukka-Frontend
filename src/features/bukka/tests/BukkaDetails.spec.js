import React from 'react';
import BukkaDetailsSection from '../components/BukkaDetailsSection';

describe('BukkaDetailsSection Component', () => {
  const props = {
    bukkaName: 'Cheepottles',
    description: 'lovely cheepotles'
  };

  const wrapper = mount(<BukkaDetailsSection {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
