import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../LoginPage';

describe('Login Page component', () => {
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

  const { getByText, getByPlaceholderText, rerender } = render(
    <MemoryRouter>
      <LoginPage {...props} />
    </MemoryRouter>
  );

  it(`dispatches the authenticateUser actionCreator
  when the submit button is clicked`, () => {
    const emailInputField = getByPlaceholderText('Email');
    const passwordInputField = getByPlaceholderText('Password');

    fireEvent.change(emailInputField, {
      target: { value: 'email@email.com', name: 'email' }
    });

    fireEvent.change(passwordInputField, {
      target: { value: 'password', name: 'password' }
    });

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    expect(props.authenticateUser).toBeCalled();
  });

  it('triggers the push prop if status key prop: authenticated is true', () => {
    const newProps = {
      ...props,
      status: {
        authenticated: true,
        error: false
      }
    };

    rerender(
      <MemoryRouter>
        <LoginPage {...newProps} />
      </MemoryRouter>
    );

    expect(newProps.history.push).toBeCalled();
  });
});
