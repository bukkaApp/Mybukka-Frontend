import React from 'react';
import Head from '../card/Head';

describe('Profile Scene component', () => {
  const props = {
    orderId: '83746',
    time: '2/3/2019 10:56 pm'
  };

  const wrapper = mount(<Head {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
