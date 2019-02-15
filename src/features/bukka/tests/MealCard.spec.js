import React from 'react';

import MealCard from '../components/MealCard';

describe('Menu Card Component', () => {
  const props = {
    title: 'Amala',
    imageUrl: 'http://some-url',
    description: 'Some text',
    price: 17,
  };
  const wrapper = mount(<MealCard {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
