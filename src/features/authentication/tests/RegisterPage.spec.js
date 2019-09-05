import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { RegisterPage } from '../RegisterPage';

const initialState = {
  navbarAuthReducer: { type: 'Sign Up' },
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

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const CustomProvider = ({ children }) => {
  const store = mockStore(initialState);
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

CustomProvider.propTypes = propTypes;

describe('Register Page component', () => {
  afterEach(cleanup);

  const props = {
    authenticateUser: jest.fn(),
    status: {
      authenticated: false,
      error: false
    },
    errorMessage: '',
    history: { push: jest.fn() }
  };

  const { queryAllByText, getByPlaceholderText, rerender } = render(
    <CustomProvider>
      <RegisterPage {...props} />
    </CustomProvider>
  );

  it.skip(`dispatches the authenticateUser actionCreator
  when the submit button is clicked`, () => {
    const firstNameInputField = getByPlaceholderText('First Name');
    const lastNameInputField = getByPlaceholderText('Last Name');
    const emailInputField = getByPlaceholderText('Email');
    const passwordInputField = getByPlaceholderText('Password');
    const confirmPasswordInputField = getByPlaceholderText('Retype Password');

    fireEvent.change(firstNameInputField, {
      target: { value: 'name', name: 'firstName' }
    });

    fireEvent.change(lastNameInputField, {
      target: { value: 'last', name: 'lastName' }
    });

    fireEvent.change(emailInputField, {
      target: { value: 'email@email.com', name: 'email' }
    });

    fireEvent.change(passwordInputField, {
      target: { value: 'password', name: 'password' }
    });

    fireEvent.change(confirmPasswordInputField, {
      target: { value: 'password', name: 'confirmPassword' }
    });

    const submitButton = queryAllByText('Sign Up');
    fireEvent.click(submitButton[1]);

    expect(props.authenticateUser).toBeCalled();
  });

  it.skip('triggers the push prop if status key prop: authenticated is true', () => {
    const newProps = {
      ...props,
      status: {
        authenticated: true,
        error: false
      }
    };

    rerender(
      <CustomProvider>
        <RegisterPage {...newProps} />
      </CustomProvider>
    );

    expect(newProps.history.push).toBeCalled();
  });
});
