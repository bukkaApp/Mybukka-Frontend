import React from 'react';

import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { LoginPage } from '../LoginPage';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  authenticationReducer: {
    user: {},
    status: {
      authenticated: false,
      error: false
    },
    errorMessage: ''
  },
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

describe('Login Page component', () => {
  afterEach(cleanup);

  const props = {
    authenticateUser: jest.fn(),
    status: {
      authenticated: false,
      error: false
    },
    errorMessage: '',
    history: { push: jest.fn(), location: { search: '?next=/profile' } }
  };
  const { rerender, getByTestId, container, getByPlaceholderText } = render(
    <CustomProvider>
      <LoginPage {...props} />
    </CustomProvider>
  );

  it.skip(`dispatches the authenticateUser actionCreator
  when the submit button is clicked`, () => {
    const emailInputField = getByPlaceholderText('Email');
    const passwordInputField = getByPlaceholderText('Password');

    console.log(container, 'button', getByTestId('button'));
    fireEvent.change(emailInputField, {
      target: { value: 'email@email.com', name: 'email' }
    });


    let submitButton = getByTestId('button');
    fireEvent.click(submitButton);

    // GOTO: Next input which would be password
    submitButton = getByTestId('button');
    fireEvent.click(submitButton);

    fireEvent.change(passwordInputField, {
      target: { value: 'password', name: 'password' }
    });

    fireEvent.click(submitButton);
    expect(props.authenticateUser).toBeCalled();
  });

  it.skip('triggers the push prop if status key prop: authenticated is true', () => {
    const newProps = {
      ...props,
      status: {
        authenticated: true,
        error: false,
      }
    };

    rerender(
      <CustomProvider>
        <LoginPage {...newProps} />
      </CustomProvider>
    );

    expect(newProps.history.push).toBeCalled();
  });
});
