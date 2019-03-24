import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TokenErrorFeedback from '../components/TokenErrorFeedback';


describe('TokenErrorFeedback component', () => {
  const props = {
    push: jest.fn()
  };
  const wrapper = shallow(
    <MemoryRouter>
      <TokenErrorFeedback {...props} />
    </MemoryRouter>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
