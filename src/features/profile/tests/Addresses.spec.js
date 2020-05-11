import React from 'react';
import { Provider } from 'react-redux';
import Addresses from '../components/Addresses';

const store = mockStore({
  deliveryModeReducer: {
    mode: 'pickup'
  },
  updateUserAddressReducer: { errorMessage: '', posted: false },
  selectedLocationReducer: { coordinates: [3.361476, 6.5560715] }
});

describe('Addresses component', () => {
  const props = {
    handleDelete: jest.fn(),
    addresses: [
      { address: '15, onayade street' }
    ]
  };
  const wrapper = mount(
    <Provider store={store}>
      <Addresses {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
