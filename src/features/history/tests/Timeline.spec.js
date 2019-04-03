import React from 'react';
import Timeline from '../common/Timeline';

describe('Timeline component', () => {
  const props = {
    time: '27/3/2019 1:28 am',
    status: 'delivery',
    icon: '',
    classNames: 'text-color',
  };

  const wrapper = mount(<Timeline {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
