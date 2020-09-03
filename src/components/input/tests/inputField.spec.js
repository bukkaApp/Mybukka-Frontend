import React from 'react';
import Field from '../Field';

describe('Input Field', () => {
  const props = {
    name: 'test',
    onFocus: jest.fn(),
    placeholderText: 'sign in',
    handleChange: jest.fn(),
    type: 'text',
    classNames: 'default-btn',
  };
  const wrapper = shallow(<Field.Input {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers the onchange function when change event ocuurs', () => {
    wrapper.simulate('change');
    expect(props.handleChange).toBeCalled();
  });
});
