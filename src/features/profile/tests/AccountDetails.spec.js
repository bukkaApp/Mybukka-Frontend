import React from 'react';
import { Provider } from 'react-redux';
import AccountDetails from '../components/AccountDetails';

const store = mockStore({
  deliveryModeReducer: {
    mode: 'pickup'
  },
  loadingReducer: { status: false },
  authenticationReducer: { status: { authenticated: true }
  },
  fetchUserData: { userInfo: {
    firstName: 'save',
    lastName: 'save',
    email: 'save',
    contactMobile: 'save'
  },
  finishedRequest: true },
  fetchUserAddress: { userAddresses: [
    { address: '15, onayade street' }
  ] },
  postUserData: { errorMessage: '' },
  postUserAddress: { errorMessage: '', posted: false },
  selectedLocationReducer: { coordinates: [3.361476, 6.5560715] }
});

describe('Account Details components', () => {
  const props = {
    requestUserAddress: jest.fn(),
    deleteUserAddress: jest.fn(),
    requestUserData: jest.fn(),
    loading: false,
    userInfo: {
      firstName: 'save',
      lastName: 'save',
      email: 'save',
      contactMobile: 'save'
    },
    userAddress: [{ address: 'address' }],
    editUserData: jest.fn()
  };
  const wrapper = mount(
    <Provider store={store}>
      <AccountDetails {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
