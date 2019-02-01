import React from 'react';
import Index from '..';

describe('Home Component', () => {
  const props = {
    history: {
      push: jest.fn(),
    }
  };

  const wrapper = shallow(<Index {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
