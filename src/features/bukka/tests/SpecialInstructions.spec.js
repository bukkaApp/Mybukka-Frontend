import React from 'react';
import SpecialInstructions from '../addToCart/SpecialInstructions';

describe('Special Instructions Component', () => {
  const wrapper = mount(<SpecialInstructions />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`changes the text length indicator value
  as the user types in textarea`, () => {
    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: 'a new instruction' } });

    const textLengthIndicatorValue = wrapper
      .find('.text-length-indicator')
      .props().children;

    expect(textLengthIndicatorValue[0]).toEqual(17);
  });
});
