import React from 'react';

import { LocationsPredictionProvider } from '../../../context/useLocationsPrediction';
import SuggestionsDropdown from '../SuggestionsDropdown';

describe('Suggestions dropdown component', () => {
  const props = {
    handleClick: jest.fn(),
    setLocation: jest.fn()
  };

  const wrapper = render(
    <LocationsPredictionProvider >
      <SuggestionsDropdown {...props} />
    </LocationsPredictionProvider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
