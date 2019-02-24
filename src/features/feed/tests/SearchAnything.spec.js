import React from 'react';

import SearchAnything from '../common/SearchAnything';

describe('SearchAnything FeedPage component', () => {
  const wrapper = mount(<SearchAnything />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
