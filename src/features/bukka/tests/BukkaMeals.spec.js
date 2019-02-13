import React from 'react';
import BukkaMeals from '../components/BukkaMeals';

describe('BukkaMeals component', () => {
  const props = {
    mealsData: [
      {
        name: 'sample meal',
        category: 'Breakfast',
        title: 'Amala',
        description:
          'A very great plate of Amala that will make you beg for more',
        imageUrl:
          'https://res.cloudinary.com/dn93xk5ni/image/upload/v1549933392/burrito-chicken-close-up-461198_g9llka.jpg', // eslint-disable-line
        price: 30
      },
      {
        name: 'sample meal',
        category: 'Breakfast',
        title: 'Amala',
        description:
          'A very great plate of Amala that will make you beg for more',
        imageUrl:
          'https://res.cloudinary.com/dn93xk5ni/image/upload/v1549933392/burrito-chicken-close-up-461198_g9llka.jpg', // eslint-disable-line
        price: 30
      }
    ]
  };

  const wrapper = mount(<BukkaMeals {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
