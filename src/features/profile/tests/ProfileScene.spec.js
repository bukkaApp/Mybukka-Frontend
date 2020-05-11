import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ProfileScene from '../components/ProfileScene';

const store = mockStore({
  deliveryModeReducer: {
    mode: 'pickup'
  },
  loadingReducer: { status: false },
  authenticationReducer: { status: { authenticated: true }
  },
  userProfileReducer: { userInfo: {
    userInfo: {
      firstName: 'save',
      lastName: 'save',
      email: 'save',
      contactMobile: 'save'
    },
  },
  finishedRequest: true },
  userAddressReducer: { address: [
    { address: '15, onayade street' }
  ] },
  updateUserProfileReducer: { errorMessage: '' },
  updateUserAddressReducer: { errorMessage: '', posted: false },
  selectedLocationReducer: { coordinates: [3.361476, 6.5560715] },
  productsReducer: { cart: [], totalPriceInCart: 0 }
});

describe.skip('Profile Scene component', () => {
  const props = {
    history: { push: jest.fn() }
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ProfileScene {...props} />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
