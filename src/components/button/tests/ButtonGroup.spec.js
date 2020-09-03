import React from 'react';

import ButtonGroup from '../ButtonGroup';

describe('Button Group component', () => {
  const wrapper = shallow(
    <ButtonGroup classNames="button-text">
      <button>CHILD</button>
    </ButtonGroup>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
