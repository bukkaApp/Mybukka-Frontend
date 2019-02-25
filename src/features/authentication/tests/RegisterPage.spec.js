import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from '../RegisterPage';

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

  const { getByText, getByPlaceholderText, rerender } = render(
    <MemoryRouter>
      <RegisterPage {...props} />
    </MemoryRouter>
  );

  it(`dispatches the authenticateUser actionCreator
  when the submit button is clicked`, () => {
    const firstNameInputField = getByPlaceholderText('First Name');
    const lastNameInputField = getByPlaceholderText('Last Name');
    const emailInputField = getByPlaceholderText('Email');
    const passwordInputField = getByPlaceholderText('Password');
    const confirmPasswordInputField = getByPlaceholderText('Retype Password');

    fireEvent.change(firstNameInputField, {
      target: { value: 'Name', name: 'firstName' }
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
        <RegisterPage {...newProps} />
      </MemoryRouter>
    );

    expect(newProps.history.push).toBeCalled();
  });
});
