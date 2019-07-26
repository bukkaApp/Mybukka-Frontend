import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ShoppingCart from '../components/ShoppingCart';

const initialState = {
  checkoutModeReducer: { mode: true },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
  },
  fetchBukkaReducer: {
    fetchedBukka: {
      title: 'title',
      imageUrl: 'www.imageUrl.com',
      description: 'your description',
      price: 4454,
    },
    status: {
      fetched: false,
      error: false,
    },
  },
  fetchBukkaMenuReducer: {
    bukkaMenu: [
      {
        title: 'title',
        imageUrl: 'www.imageUrl.com',
        description: 'your description',
        price: 4454,
        category: 'african',
        slug: 'any-way-slug'
      }
    ],
    cart: [
      {
        name: 'name',
        price: 90,
        slug: 'jdj-dfj'
      }
    ]
  }
};

const store = mockStore(initialState);

describe.skip('Area to explore component', () => {
  const wrapper = render(
    <Provider store={store}>
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
