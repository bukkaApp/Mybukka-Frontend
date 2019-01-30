import React from 'react';

import SuggestionsDropdown from '../SuggestionsDropdown';

describe('Suggestions dropdown component', () => {
  const props = {
    handleClick: jest.fn(),
  };
  const wrapper = shallow(<SuggestionsDropdown {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
