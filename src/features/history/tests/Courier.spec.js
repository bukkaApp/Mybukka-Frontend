import React from 'react';
import Courier from '../common/Courier';

describe('Courier component', () => {
  const props = {
    courierName: 'courier any',
    courierImg: 'https://www.google.com/img',
  };

  const wrapper = mount(<Courier {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
