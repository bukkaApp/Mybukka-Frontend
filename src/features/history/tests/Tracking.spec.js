import React from 'react';
import { Provider } from 'react-redux';
import Tracking from '../components/Tracking';

const initialState = {
  displayTrackingReducer: { show: true, status: 'pending' },
};

const store = mockStore(initialState);

describe('Tracking component', () => {
  const props = {
    show: false,
    closeTrackingDropdown: jest.fn(),
    handleClick: jest.fn(),
    status: 'delivered'
  };

  const { rerender, container, getByTestId } = render(
    <Provider store={store}>
      <Tracking {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('re renders properly when rejected status', () => {
    const newProps = {
      ...props,
      show: true,
      status: 'rejected',
    };
    rerender(
      <Provider store={store}>
        <Tracking {...newProps} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('re renders properly when pending status', () => {
    const newProps = {
      ...props,
      show: true,
      status: 'pending',
    };
    rerender(
      <Provider store={store}>
        <Tracking {...newProps} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('re renders properly when accepted status', () => {
    const newProps = {
      ...props,
      show: true,
      status: 'accepted',
    };
    rerender(
      <Provider store={store}>
        <Tracking {...newProps} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('re renders properly when cancelled status', () => {
    const newProps = {
      ...props,
      show: true,
      status: 'cancelled',
    };
    rerender(
      <Provider store={store}>
        <Tracking {...newProps} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('triggers the closeTrackingDropdown function when clicked', () => {
    const button = getByTestId('button');
    fireEvent.click(button);

    expect(props.show).toBeFalsy();
  });
});
