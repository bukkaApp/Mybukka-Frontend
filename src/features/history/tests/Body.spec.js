import React from 'react';
import Body from '../card/Body';

describe('Profile Scene component', () => {
  const props = {
    quantity: '2',
    title: 'salad and bbq'
  };

  const wrapper = mount(<Body {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
