import React from 'react';
import BukkaCard from '../BukkaCard';

describe('BukkaCard component', () => {
  const props = {
    deliveryCost: 1000,
    deliveryTime: '20-20 hours',
    rating: '',
    classNames: 'col-lg-3',
    imageHeight: 'img-height',
    textOverlay: true,
    imageUrl: 'http://some-image',
  };
  const wrapper = shallow(<BukkaCard {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
