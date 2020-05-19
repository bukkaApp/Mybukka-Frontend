import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import bukkaData from '../common/bukkaData.json';
import Category from '../components/Category';

const initialState = {
  changeAuthenticationPageReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
  },
  businessGroupReducer: {
    cuisineItems: [{
      _id: '5ddc5dfb9a29af135cd21ce7',
      name: 'american',
      imageUrl: 'https://res.cloudinary.com/mybukka/image/upload/v1574723013/American_e1n3aj.png'
    }],
    errorMessage: '',
    currentPage: 1,
    cuisineToDisplay: { name: 'cuisine name' },
  },
  businessesReducer: {
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
    const nearbyBukkas = bukkaData;
    const newState = {
      ...initialState,
      businessesReducer: {
        ...initialState.businessesReducer,
        fetchedBukkas: {
          ...initialState.businessesReducer.fetchedBukkas,
          nearbyBukkas,
          message: ''
        },
        status: {
          ...initialState.businessesReducer.status,
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
