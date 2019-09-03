import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ResetPassword from '../ResetPassword';
import auth from './__mocks__/changePasswordAction.json';


const initialState = {
  navbarAuthReducer: { type: '/login' },
  requestPasswordChangesReducer: { requested: true, errorMessage: 'error occur' },
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

describe('Reset Password component', () => {
  const props = {
    status: {
      authenticated: false,
      error: false
    },
    requested: false,
    errorMessage: 'error occur',
    history: { push: jest.fn() },
    location: { search: auth.token },
    sendARequestToChangePassword: jest.fn()
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ResetPassword {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
