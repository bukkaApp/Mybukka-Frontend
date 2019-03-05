import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import AuthorisationFooter from '../components/AuthFooter';

const initialState = {
  user: {},
  status: {
    authenticated: false,
    error: false
  },
  errorMessage: ''
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
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

CustomProvider.propTypes = propTypes;

describe('Authorisation Footer component', () => {
  const props = {
    title: 'Sign Up',
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    domStructure: [
      {
        name: 'firstName',
        type: 'text',
        placeholder: 'First Name',
        id: 'firstName'
      }
    ],
    isFormCompleted: true,
    type: 'signin'
  };
  const wrapper = shallow(
    <CustomProvider>
      <AuthorisationFooter {...props} />
    </CustomProvider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
