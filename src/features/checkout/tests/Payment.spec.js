import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Payment
  from '../components/Payment';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
};

const store = mockStore(initialState);

describe.skip('Area to explore component', () => {
  const props = {
    handleClick: jest.fn(),
    handleChange: jest.fn()
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Payment {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
