import React from 'react';

import { Provider } from 'react-redux';
import AddAddressForm from '../forms/AddAddressForm';

const store = mockStore({
  deliveryModeReducer: {
    mode: 'pickup'
  },
  postUserAddress: { errorMessage: '', posted: false },
  selectedLocationReducer: { coordinates: [3.361476, 6.5560715] }
});

describe('AddPayment form component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <AddAddressForm />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
