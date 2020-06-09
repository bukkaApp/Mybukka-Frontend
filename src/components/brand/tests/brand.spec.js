import React from 'react';
import Brand from '../Brand';
import useHistory from '../../../hooks/useHistory';

describe('Brand component', () => {
  const wrapper = shallow(<Brand useHistory={useHistory} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
