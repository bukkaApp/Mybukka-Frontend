import React from 'react';
import TextField from '../common/TextField';
import Data from './__mocks__/register';


describe('Input field component', () => {
  const props = {
    handleChange: jest.fn(),
    validationErrors: Data.validationErrorsMock,
    domStructure: Data.domStructureMock,
  };
  const wrapper = mount(<TextField {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
