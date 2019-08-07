import React from 'react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../components/Checkout';

describe.skip('Area to explore component', () => {
  const store = mockStore({
    navbarAuthReducer: { type: 'Sign Up' },
    authenticationReducer: {
      user: {},
      status: {
        authenticated: false,
        error: false
      },
      errorMessage: ''
    },
    deliveryModeReducer: {
      mode: 'pickup'
    },
    chargeUserReducer: {
      message: 'yea',
      data: {
        reference: '',
        status: '',
        display_text: ''
      }
    },
    finishTransactionReducer: {
      status: { success: false },
      message: 'jhfj'
    },
    fetchBukkaReducer: {
      fetchedBukka: { slug: 'kssk-jhddj' }
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
      totalPriceInCart: 0,
      cart: [
        {
          title: 'name',
          price: 90,
          slug: 'jdj-dfj'
        }
      ]
    }
  });

  const wrapper = render(
    <Provider store={store}>
      <MemoryRouter>
        <Checkout push={jest.fn()} />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
