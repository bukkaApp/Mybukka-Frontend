import React from 'react';

import UseCurrentLocation from '../UseCurrentLocation';

describe('Use current location ccomponent', () => {
  const store = mockStore({});

  const props = {
    selectLocation: jest.fn()
  };
  const wrapper = render(
    <Provider store={store}>
      <UseCurrentLocation {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
