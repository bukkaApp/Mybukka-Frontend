import React from 'react';

import { Provider } from 'react-redux';

import DeliveryAddress from '../forms/AddressSection';

describe('Area to explore component', () => {
  const store = mockStore({
    deliveryModeReducer: {
      mode: 'pickup'
    }
  });

  const props = {
    handleClick: jest.fn(),
    handleChange: jest.fn()
  };
  const wrapper = render(
    <Provider store={store}>
      <DeliveryAddress {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
