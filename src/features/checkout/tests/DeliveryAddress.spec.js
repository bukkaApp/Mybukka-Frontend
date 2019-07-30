import React from 'react';

import { Provider } from 'react-redux';

import DeliveryAddress from '../components/DeliveryAddress';

describe.skip('Area to explore component', () => {
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

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
