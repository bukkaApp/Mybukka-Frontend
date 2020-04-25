import React from 'react';

import SuggestionsDropdown from '../SuggestionsDropdown';

describe('Suggestions dropdown component', () => {
  const store = mockStore({
    locationsPredictionReducer: {
      predictions: [
        {
          description: 'some-description',
          id: '123'
        }
      ]
    }
  });

  const props = {
    handleClick: jest.fn(),
    setLocation: jest.fn()
  };

  const wrapper = render(
    <Provider store={store}>
      <SuggestionsDropdown {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
