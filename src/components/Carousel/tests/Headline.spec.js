import React from 'react';
import { Provider } from 'react-redux';

import Headline from '../Headline';

const initialState = {
  selectedLocationReducer: { coordinates: [3.7474, 3.4848] }
};

const store = mockStore(initialState);

describe('Headline Components', () => {
  const props = {
    title: 'Headline',
    numberOfViews: 2,
    slidesLength: 3,
    activeIndex: 1,
  };

  const { container, rerender } = render(
    <Provider store={store}>
      <Headline {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('renders properly', () => {
    const newState = {
      ...initialState,
      bukkasReducer: {
        ...initialState.bukkasReducer,
        fetchedBukkas: {
          ...initialState.bukkasReducer.fetchedBukkas,
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
    };
    const newStore = mockStore(newState);
    rerender(
      <Provider store={newStore}>
        <Headline {...newProps} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
