import React from 'react';
import GeoSuggestions from '../GeoSuggestions';

describe('Geo Suggestions component', () => {
  const props = {
    handleClick: jest.fn()
  };

  const store = mockStore({
    locationsPredictionReducer: {
      predictions: [
        {
          description: 'Mende',
          id: '123'
        }
      ]
    }
  });

  const { getByText } = render(
    <Provider store={store}>
      <GeoSuggestions {...props} />
    </Provider>
  );

  it(`calls the handleClick function when the
  clickable element is clicked`, () => {
    const submitButton = getByText('Mende');
    fireEvent.click(submitButton);

    expect(props.handleClick).toBeCalled();
  });
});
