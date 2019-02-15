import React from 'react';
import AddToCartButton from '../addToCart/AddToCartButton';

describe('Add To Cart Button', () => {
  const props = {
    handleClick: jest.fn(),
    price: 15,
  };
  const wrapper = mount(<AddToCartButton {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers the handleClick function when button is called', () => {
    const button = wrapper.find('.add-to-cart-button');
    button.simulate('click');

    expect(props.handleClick).toBeCalled();
  });
});
