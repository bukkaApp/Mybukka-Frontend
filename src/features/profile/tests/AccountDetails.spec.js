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
  userProfileReducer: { userInfo: {
    firstName: 'save',
    lastName: 'save',
    email: 'save',
    contactMobile: 'save'
  },
  finishedRequest: true },
  userAddressReducer: { userAddresses: [
    { address: '15, onayade street' }
  ] },
  updateUserProfileReducer: { errorMessage: '' },
  updateUserAddressReducer: { errorMessage: '', posted: false },
  selectedLocationReducer: { coordinates: [3.361476, 6.5560715] }
});

describe.skip('Account Details components', () => {
  const props = {
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

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
