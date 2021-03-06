import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import BukkaMeals from '../components/BukkaMeals';

const initialState = {
  changeAuthenticationPageReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  checkoutModeReducer: { mode: true },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  productsReducer: { bukkaMenu: [
    {
      title: 'title',
      imageUrl: 'www.imageUrl.com',
      description: 'your description',
      price: 4454,
      category: 'african',
      slug: 'any-way-slug'
    }
  ] }
};

const store = mockStore(initialState);

describe.skip('BukkaMeals component', () => {
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

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <BukkaMeals {...props} />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
