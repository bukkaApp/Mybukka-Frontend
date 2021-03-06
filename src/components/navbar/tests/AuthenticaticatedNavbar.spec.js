import React from 'react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AuthenticaticatedNavbar from '../BukkaAuthenticatedNav';


describe('Primary Navbar', () => {
  const store = mockStore({
    changeAuthenticationPageReducer: { type: 'Sign Up' },
    deliveryModeReducer: {
      mode: 'pickup'
    }
  });

  const props = {
    status: { authenticated: true }
  };

  const wrapper = shallow(
    <Provider store={store}>
      <MemoryRouter>
        <AuthenticaticatedNavbar {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
