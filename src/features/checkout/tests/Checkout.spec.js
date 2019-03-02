import React from 'react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../components/Checkout';

describe('Area to explore component', () => {
  const store = mockStore({
    deliveryModeReducer: {
      mode: 'pickup',
    },
  });

  const wrapper = render(
    <Provider store={store}>
      <MemoryRouter>
        <Checkout push={jest.fn()} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
