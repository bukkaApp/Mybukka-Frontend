import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import freeDelivery from '../data/free-delivery.json';
import bukkaData from '../data/search.json';
import Category from '../components/Category';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
  },
  cuisineReducer: {
    cuisineItems: [{
      _id: '5ddc5dfb9a29af135cd21ce7',
      name: 'american',
      imageUrl: 'https://res.cloudinary.com/mybukka/image/upload/v1574723013/American_e1n3aj.png'
    }],
    errorMessage: '',
    currentPage: 1,
    cuisineToDisplay: { name: 'cuisine name' },
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

describe('Category component', () => {
  const props = {
    signOut: jest.fn(),
    match: {
      params: { id: 'ameriacan' },
    },
    setDeliveryModeAction: jest.fn(),
    push: jest.fn(),
    coordinates: [3.7474, 3.4848],
    fetchedBukkas: { nearbyBukkas: [] },
    fetchNearbyBukkas: jest.fn(),
    status: { error: false }
  };
  const { container, rerender } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Category {...props} />
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
          <Category {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
