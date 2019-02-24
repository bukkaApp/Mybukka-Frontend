import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import Feed from '../components/feed';

describe('FeedPage component', () => {
  const wrapper = shallow(<MemoryRouter><Feed push={jest.fn()} /></MemoryRouter>);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
