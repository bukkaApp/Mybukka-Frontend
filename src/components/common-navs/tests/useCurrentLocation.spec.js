import React from 'react';

import UseCurrentLocation from '../UseCurrentLocation';

describe('Use current location ccomponent', () => {
  const props = {
    handleClick: jest.fn(),
  };
  const wrapper = shallow(<UseCurrentLocation {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the handleClick prop function whenb the clickable element is clicked', () => {
    wrapper.find('.suggestion-geo-group').simulate('click');

    expect(props.handleClick).toBeCalled();
  });
});
