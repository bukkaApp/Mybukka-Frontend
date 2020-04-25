import React from 'react';

import SearchLocation from '../SearchLocation';

describe('Search Location', () => {
  const store = mockStore({
    locationsPredictionReducer: {
      predictions: [{}]
    },
    selectedLocationReducer: {
      selectedLocation: {
        description: 'selected'
      }
    }
  });

  const props = {
    google: {
      maps: {
        GeoCoder: jest.fn(),
      }
    }
  };

  const wrapper = render(
    <Provider store={store}>
      <SearchLocation {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
