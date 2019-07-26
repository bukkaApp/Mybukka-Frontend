import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import TotalAmt
  from '../components/TotalAmt';

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
  fetchBukkaMenuReducer: { bukkaMenu: [
    {
      title: 'title',
      imageUrl: 'www.imageUrl.com',
      description: 'your description',
      price: 4454,
      category: 'african',
      slug: 'any-way-slug'
    }
  ] },
  cart: [],
  totalPriceInCart: 0
};

const store = mockStore(initialState);

describe.skip('Area to explore component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <TotalAmt />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
