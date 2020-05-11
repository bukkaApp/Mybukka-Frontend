import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import bukkaData from '../common/bukkaData.json';
import SearchResult from '../components/SearchResult';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  searchAnythingReducer: { search: '' },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  authenticationReducer: {
    status: {
      authenticated: false,
      error: false
    }
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

describe.skip('SearchResult component', () => {
  const props = {
    signOut: jest.fn(),
    setDeliveryModeAction: jest.fn(),
    push: jest.fn(),
    coordinates: [3.7474, 3.4848],
    fetchedBukkas: { nearbyBukkas: [] },
    fetchNearbyBukkas: jest.fn(),
    status: { error: false },
    businessGroupReducer: {
      cuisineItems: [],
      errorMessage: '',
      currentPage: 1,
      cuisineToDisplay: { name: '' },
    },
  };
  const { container, rerender } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchResult {...props} />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(container).toMatchSnapshot();
  });
  it.skip('renders properly', () => {
    const nearbyBukkas = bukkaData;
    const newState = {
      ...initialState,
      searchAnythingReducer: { search: 'a' },
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
          <SearchResult {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
