import React from 'react';
import Table from '../components/Table';

describe('Table component', () => {
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
