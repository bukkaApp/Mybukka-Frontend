import React from 'react';
import Container from '../Container';

describe('Container component', () => {
  const wrapper = shallow(<Container><div>row</div></Container>);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
