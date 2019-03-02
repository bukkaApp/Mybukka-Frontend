import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import BukkaAuthenticatedNav from '../BukkaAuthenticatedNav';

describe('Bukka Authenticated Nav', () => {
  const props = {
    push,
    authenticated,
    navigateToNextRoute
  };
  const wrapper = mount(
    <MemoryRouter>
      <BukkaAuthenticatedNav />
    </MemoryRouter>
    );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
