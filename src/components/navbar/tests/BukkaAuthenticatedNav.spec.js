import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import BukkaAuthenticatedNav from '../BukkaAuthenticatedNav';


describe('Bukka Authenticated Nav', () => {
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

  const props = {
    status: { authenticated: false },
    push: jest.fn(),
    navigateToNextRoute: jest.fn()
  };

  const wrapper = shallow(
    <Provider store={store}>
      <MemoryRouter>
        <BukkaAuthenticatedNav {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
