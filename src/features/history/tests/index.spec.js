import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Index from '../';

const store = mockStore({
  displayTrackingReducer: {
    show: true,
    status: 'pending',
  },
  getOrderHistoryReducer: { status: { fetched: true, error: false } },
});

describe('Profile Scene component', () => {
  const props = {
    history: { push: jest.fn() }
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Index {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
