import React from 'react';
import { Provider } from 'react-redux';
import Transaction from '../components/Transaction';

const initialState = {
  displayTrackingReducer: {
    show: true,
    status: 'pending',
  },
  getOrderHistoryReducer: { orderHistory: { userOrders: [
    {
      time: '27/3/2019 12:43 pm',
      _id: '03d77',
      status: 'pending',
      cart: { items: [{ meals: { title: 'jollof rice', price: 2000 } }] }
    }
  ] },
  status: { fetched: true, error: false } },
};

const store = mockStore(initialState);


describe.skip('Transaction component', () => {
  const props = {
    data: [{
      cart: { items: [{ meals: [{ title: 'jollof rice', price: 2000 }], quantity: 1 }] },
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
      deliveryAddress: {
        address: 'delivery address street',
        name: 'mr delivery name',
        contactMobile: '94574783930',
      },
      _id: '03d77',
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

  it.skip('should triggers the handleclick function when clicked on table element', () => {
    const tableBtn = getByTestId('table-btn').firstChild;
    console.log('tableBtn fffdvfdfvd', tableBtn);
    fireEvent.click(tableBtn);
    expect(props.handleClick).toHaveBeenCalled();
  });

  it.skip('should triggers the handleclick function when clicked on card', () => {
    const button = getByTestId('card-button').firstChild;
    console.log('hdjdjkdkj', button);
    fireEvent.click(button);

    expect(props.handleClick).toBeCalled();
  });
});
