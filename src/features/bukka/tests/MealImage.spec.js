import React from 'react';
import MealImage from '../addToCart/MealImage';

describe('Meal Image Component', () => {
  const wrapper = mount(<MealImage imageUrl="http://some-img-url" />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
