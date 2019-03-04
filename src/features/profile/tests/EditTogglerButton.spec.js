import React from 'react';

import EditTogglerButton from '../common/EditTogglerButton';

describe(' EditTogglerButton component', () => {
  const wrapper = mount(
    <EditTogglerButton text="EDIT" />
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
