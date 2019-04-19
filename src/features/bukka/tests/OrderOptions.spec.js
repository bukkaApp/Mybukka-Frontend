import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import OrderOptions from '../addToCart/OrderOptions';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  checkoutModeReducer: { mode: true },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
  },
  fetchBukkaMenuReducer: { bukkaMenu: [
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

describe('Order Options Component', () => {
  const props = {
    title: 'Amala',
    descriptions: 'best meal youll ever eat'
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <OrderOptions {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
