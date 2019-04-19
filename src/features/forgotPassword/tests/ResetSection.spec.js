import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ResetSection from '../components/ResetSection';


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

describe('ResetSection component', () => {
  const props = {
    status: {
      authenticated: false,
      error: false
    },
    requested: false,
    errorMessage: 'error occur',
    history: { push: jest.fn() },
    sendARequestToChangePassword: jest.fn()
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ResetSection {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
