import React from 'react';
import InputField from '../InputField';

describe('Input Field', () => {
  const props = {
    name: 'test',
    handleFocus: jest.fn(),
    placeholderText: 'sign in',
    handleChange: jest.fn(),
    type: 'text',
    classNames: 'default-btn',
  };
  const wrapper = shallow(<InputField {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers the onchange function when change event ocuurs', () => {
    wrapper.simulate('change');
    expect(props.handleChange).toBeCalled();
  });
});
