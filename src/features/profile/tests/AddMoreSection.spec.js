import React from 'react';

import AddMoreSection from '../common/AddMoreSection';

describe('AddMoreSection component', () => {
  const props = {
    dataTarget: '#modal',
    text: 'add new card'
  };
  const wrapper = mount(
    <AddMoreSection {...props}>
      <p>child</p>
    </AddMoreSection>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
