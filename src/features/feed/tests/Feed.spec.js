import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import freeDelivery from '../data/free-delivery.json';
import bukkaData from '../data/search.json';
import FoodSection from '..';

const initialState = {
  homeReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
  },
  bukkasReducer: {
    fetchedBukkas: {
      nearbyBukkas: [],
      message: ''
    },
    status: {
      fetchedBukkas: false,
      error: true,
    }
  },
  selectedLocationReducer: { coordinates: [3.7474, 3.4848] }
};

const store = mockStore(initialState);

describe('FoodSection component', () => {
  const props = {
    food: true,
    drink: true,
    category: true,
    search: true,
    fresh: true,
    setDeliveryModeAction: jest.fn(),
    history: { push: jest.fn() },
    coordinates: [3.7474, 3.4848],
    fetchedBukkas: { nearbyBukkas: [] },
    fetchNearbyBukkas: jest.fn(),
    status: { error: false }
  };
  const { container, rerender } = render(
    <Provider store={store}>
      <MemoryRouter>
        <FoodSection {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });
  it('renders properly', () => {
    const nearbyBukkas = [...freeDelivery, ...bukkaData];
    const newState = {
      ...initialState,
      bukkasReducer: {
        ...initialState.bukkasReducer,
        fetchedBukkas: {
          ...initialState.bukkasReducer.fetchedBukkas,
          nearbyBukkas,
          message: ''
        },
        status: {
          ...initialState.bukkasReducer.status,
          fetchedBukkas: true,
          error: false
        }
      }
    };
    const newProps = {
      ...props,
      fetchedBukkas: { nearbyBukkas },
    };
    const newStore = mockStore(newState);
    rerender(
      <Provider store={newStore}>
        <MemoryRouter>
          <FoodSection {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
