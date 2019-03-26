import React from 'react';
import Card from '../components/Card';

describe('Card component', () => {
  const props = {
    quantity: '2',
    mealTitle: 'salad and bbq',
    handleClick: jest.fn(),
    time: '27/3/2019 12:43 pm',
    orderId: '03d77',
    price: '3000',
    status: 'pending',
  };

  const { container, getByRole } = render(<Card {...props} />);

  it('should renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should triggers the handleclick function when clicked', () => {
    const button = getByRole('button');
    fireEvent.click(button);

    expect(props.handleClick).toBeCalled();
  });
});
