import React from 'react';
import Table from '../components/Table';

describe.skip('Table component', () => {
  const props = {
    data: [
      {
        time: '27/3/2019 12:43 pm',
        _id: '03d77',
        status: 'pending',
        cart: { items: [{ meals: { title: 'jollof rice', price: 2000 } }] },
        deliveryAddress: {
          address: 'delivery address street',
          name: 'mr delivery name',
          contactMobile: '94574783930',
          time: '27/3/2019 12:43 pm',
        },
        pickup: {
          address: 'pickup address street',
          contactMobile: '03847858',
        },
      }],
    handleClick: jest.fn(),
    extractPrice: () => 300,
    extractQuantity: () => 3,
  };

  const { container, getByTestId } = render(<Table {...props} />);

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('renders properly', () => {
    const tableBtn = getByTestId('table-btn');
    fireEvent.click(tableBtn);
    expect(props.handleClick).toHaveBeenCalled();
  });
});
