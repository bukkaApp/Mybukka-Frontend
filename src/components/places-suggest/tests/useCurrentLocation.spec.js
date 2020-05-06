import React from 'react';

import { LocationProvider } from '../../../context/LocationContext';
import UseCurrentLocation from '../UseCurrentLocation';

describe('Use current location ccomponent', () => {
  const props = {
    selectLocation: jest.fn()
  };
  const wrapper = render(
    <LocationProvider>
      <UseCurrentLocation {...props} />
    </LocationProvider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
