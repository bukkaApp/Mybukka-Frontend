import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import UrlLists from '../UrlLists';

describe('Urllists component,', () => {
  const props = {
    title: 'Title',
    links: [
      { text: 'link 1', href: '/', key: '1' },
      { text: 'link 1', href: '/', key: '2' }
    ],
    classNames: 'black'
  };
  const wrapper = render(
    <MemoryRouter>
      <UrlLists {...props} />
    </MemoryRouter>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
