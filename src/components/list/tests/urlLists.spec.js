import React from 'react';
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
  const wrapper = shallow(<UrlLists {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
