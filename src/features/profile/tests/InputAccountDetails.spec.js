import React from 'react';

import InputAccountDetails from '../common/InputAccountDetails';

describe('InputAccountDetails component', () => {
  const props = {
    placeHolder: 'First Name',
    name: 'firstName',
    type: 'firstName',
    defaultValue: 'Value',
  };

  const wrapper = mount(
    <InputAccountDetails {...props}><p>child</p></InputAccountDetails>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
