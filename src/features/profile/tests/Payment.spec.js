import React from 'react';
import { Provider } from 'react-redux';
import Payment from '../components/Payment';

const store = mockStore({
  deliveryModeReducer: {
    mode: 'pickup'
  },
  updateUserAddressReducer: { errorMessage: '', posted: false },
  selectedLocationReducer: { coordinates: [3.361476, 6.5560715] }
});

describe('PaymentSection Component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Payment />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
