import React from 'react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import bukkaData from 'Features/feed/common/bukkaData.json';
import Carousel from '../Carousel';

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

describe('Carousel component', () => {
  const props = {
    textOverlay: false,
    classNames: 'some-classnames',
    noOfImagesShown: 3,
    title: 'A carousel',
    slideItems: [
      {
        deliveryTime: '30-50 min',
        author: 'Bane',
        deliveryCost: 300,
        imageUrl:
          'https://res.cloudinary.com/deqt3envc/image/upload/v1549300439/banner-img-3.jpg',
        rating: 'popular',
        position: { top: true },
        heading: 'it\'s heading',
        subHeading: 'sub heading here',
      },
      {
        deliveryTime: '1 hour',
        author: "Ra's Al Ghul",
        deliveryCost: 400,
        imageUrl:
          'https://res.cloudinary.com/deqt3envc/image/upload/v1549300440/banner-img-2.jpg',
        position: { bottom: true },
        heading: 'it\'s heading',
        subHeading: 'sub heading here',
      }
    ],
    imageHeight: 'img-height',
    controlClassNames: 'control-class'
  };

  const { container, rerender } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Carousel {...props} />
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
          <Carousel {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
