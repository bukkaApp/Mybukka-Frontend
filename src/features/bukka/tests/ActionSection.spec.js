import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ActionSection from '../addToCart/ActionSection';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
};

const store = mockStore(initialState);

describe('Action Section Component', () => {
  const props = {
    price: 15,
    handleClick: jest.fn(),
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ActionSection {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
