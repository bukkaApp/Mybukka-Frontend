import React from 'react';
import Button from '../Button';

describe('Button component', () => {
  const props = {
    text: 'SIGN IN',
    classNames: 'small-button',
    type: 'button',
    handleClick: jest.fn()
  };
  const wrapper = shallow(<Button {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props().children).toBe(props.text);
    expect(wrapper.props().className).toBe(props.classNames);
  });

  it('triggers the handleclick function when clicked', () => {
    wrapper.simulate('click');

    expect(props.handleClick).toBeCalled();
  });
});
