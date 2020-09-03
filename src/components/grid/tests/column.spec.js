import React from 'react';

import Column from '../Column';

describe('Column component', () => {
  const wrapper = shallow(<Column classNames="col-4 col-xs-3">value</Column>);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('appends classnames to class col', () => {
    const classNames = wrapper.props().className;
    expect(classNames).toEqual('col col-4 col-xs-3');
  });
});
