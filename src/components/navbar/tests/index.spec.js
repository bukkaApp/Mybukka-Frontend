import React from 'react';

import { Provider } from 'react-redux';
import Index from '..';

describe('Navbar Index container', () => {
  const store = mockStore({
    changeAuthenticationPageReducer: { type: 'Sign Up' },
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
