import React from 'react';
import GeoSuggestions from '../GeoSuggestions';

describe('Geo Suggestions component', () => {
  const props = {
    suggestions: [{ location: 'Mende', key: '1' }],
    handleClick: jest.fn(),
  };
  const wrapper = shallow(<GeoSuggestions {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls the handleClick function when the
  clickable element is clicked`, () => {
    wrapper.find('.suggestion-geo-group').simulate('click');

    expect(props.handleClick).toBeCalled();
  });
});
