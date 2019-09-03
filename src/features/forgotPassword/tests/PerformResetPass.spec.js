import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import PerformResetPass from '../PerformResetPass';
import auth from './__mocks__/changePasswordAction.json';


const initialState = {
  navbarAuthReducer: { type: '/login' },
  validateTokenReducer: { isValidUser: true, requested: true, },
  changePasswordReducer: { requested: true, errorMessage: 'error occur' },
  authenticationReducer: {
    user: {},
    status: {
      authenticated: false,
      error: false
    },
    errorMessage: ''
  }
};

const middlewares = [];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);


describe('Perform Reset Pass component', () => {
  const props = {
    status: {
      authenticated: false,
      error: false
    },
    history: { push: jest.fn() },
    location: { search: auth.token }
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <PerformResetPass {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
