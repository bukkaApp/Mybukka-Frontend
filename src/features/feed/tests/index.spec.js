import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import freeDelivery from '../data/free-delivery.json';
import bukkaData from '../data/search.json';
import Feed from '../components';

const initialState = {
  navbarAuthReducer: { type: 'Sign In', },
  searchAnythingReducer: { search: '' },
  deliveryModeReducer: { mode: 'delivery', },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  checkoutModeReducer: { mode: true },
  drinkReducer: { fetchedBukkas: { nearbyBukkas: [] } },
  freshReducer: { fetchedBukkas: { nearbyBukkas: [] } },
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
  fetchBukkaMenuReducer: {
    bukkaMenu: [
      {
        title: 'title',
        imageUrl: 'www.imageUrl.com',
        description: 'your description',
        price: 4454,
        category: 'african',
        slug: 'any-way-slug'
      }
    ],
    cart: [
      {
        name: 'name',
        price: 90,
        slug: 'jdj-dfj'
      }
    ]
  },
  selectedLocationReducer: { coordinates: [3.7474, 3.4848] }
};

const store = mockStore(initialState);

describe.skip('FeedPage component', () => {
  const props = {
    food: true,
    signOut: jest.fn(),
    setDeliveryModeAction: jest.fn(),
    push: jest.fn(),
    coordinates: [3.7474, 3.4848],
    fetchedBukkas: { nearbyBukkas: [] },
    fetchNearbyBukkas: jest.fn(),
    status: { error: false },
    currentCategory: 'Chipottle',
  };
  const { container, rerender } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Feed {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });
  it.skip('rerenders food component properly', () => {
    const nearbyBukkas = [...freeDelivery, ...bukkaData];
    const newState = {
      ...initialState,
      searchAnythingReducer: { search: 'a' },
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
          <Feed {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  it.skip('rerenders drinks component properly', () => {
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
      food: false,
      drink: true,
      fetchedBukkas: { nearbyBukkas },
    };
    const newStore = mockStore(newState);
    rerender(
      <Provider store={newStore}>
        <MemoryRouter>
          <Feed {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  it.skip('rerenders category component properly', () => {
    const nearbyBukkas = [...freeDelivery, ...bukkaData];
    const newState = {
      ...initialState,
      searchAnythingReducer: { search: 'jack' },
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
      food: false,
      drink: false,
      category: true,
      fetchedBukkas: { nearbyBukkas },
    };
    const newStore = mockStore(newState);
    rerender(
      <Provider store={newStore}>
        <MemoryRouter>
          <Feed {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  it.skip('rerenders fresh component properly', () => {
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
      food: false,
      drink: false,
      category: false,
      search: false,
      fresh: true,
      fetchedBukkas: { nearbyBukkas },
    };
    const newStore = mockStore(newState);
    rerender(
      <Provider store={newStore}>
        <MemoryRouter>
          <Feed {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
