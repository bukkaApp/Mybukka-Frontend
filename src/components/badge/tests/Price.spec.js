import React from 'react';
import Price from '../Price';

describe('Price Component', () => {
  const wrapper = shallow(<Price price={17} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
