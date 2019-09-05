import React from 'react';

import { Provider } from 'react-redux';
import Index from '..';

describe('Navbar Index container', () => {
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
    }
  });

  const wrapper = shallow(
    <Provider store={store}>
      <Index />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
