import React from 'react';
import TableHead from '../components/TableHead';

describe('TableHead component', () => {
  const wrapper = mount(<TableHead />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
