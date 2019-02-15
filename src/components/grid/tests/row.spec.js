import React from 'react';

import Row from '../Row';

describe('Row Component', () => {
  const wrapper = shallow(<Row>value</Row>);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
