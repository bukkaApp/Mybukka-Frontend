import React from 'react';
import { Provider } from 'react-redux';
import Transaction from '../components/Transaction';

const initialState = {
  displayTrackingReducer: {
    show: true,
    status: 'pending',
  },
  getOrderHistoryReducer: { status: { fetched: true, error: false } },
};

const store = mockStore(initialState);


describe('Transaction component', () => {
  const props = {
    data: [{
      quantity: '2',
      title: 'salad and bbq',
      time: '27/3/2019 12:43 pm',
      orderId: '03d77',
      price: '3000',
      status: 'pending',
      courier: {
        name: 'curier name',
        img: 'https;//www.google.com/img',
      },
      pickup: {
        address: 'pickup address street',
        contactMobile: '03847858',
      },
      delivery: {
        address: 'delivery address street',
        name: 'mr delivery name',
        contactMobile: '94574783930',
      }
    }],
    handleClick: jest.fn(),
  };

  const { container, getByTestId } = render(
    <Provider store={store}>
      <Transaction {...props} />
    </Provider>
  );

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should triggers the handleclick function when clicked on table element', () => {
    const tableBtn = getByTestId('table-btn');
    fireEvent.click(tableBtn);
    expect(props.handleClick).toHaveBeenCalled();
  });

  it('should triggers the handleclick function when clicked on card', () => {
    const button = getByTestId('card-button');
    fireEvent.click(button);

    expect(props.handleClick).toBeCalled();
  });
});
