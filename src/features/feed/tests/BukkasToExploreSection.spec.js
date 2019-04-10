import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import BukkasToExploreSection from '../components/BukkasToExploreSection';

describe('BukkasToExploreSection component', () => {
  const wrapper = shallow(<MemoryRouter><BukkasToExploreSection /></MemoryRouter>);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
