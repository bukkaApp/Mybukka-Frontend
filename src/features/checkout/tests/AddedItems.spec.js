import React from 'react';

import AddedItems
  from '../components/AddedItems';

describe('Area to explore component', () => {
  const props = {
    handleClick: jest.fn()
  };
  const wrapper = mount(<AddedItems {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
