import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import AddedItems from '../components/AddedItems';

describe('Area to explore component', () => {
  const props = {
    handleClick: jest.fn()
  };
  const wrapper = render(
    <MemoryRouter>
      <AddedItems {...props} />
    </MemoryRouter>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
