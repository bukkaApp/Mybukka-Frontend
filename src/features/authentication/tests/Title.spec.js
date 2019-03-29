import React from 'react';
import Title from '../components/Title';


describe('Title component', () => {
  const props = {
    userEmail: 'myemail@email.com',
    slideToNextInput: false,
  };
  const { container, rerender } = render(<Title {...props} />);

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('re renders properly', () => {
    const newProps = {
      ...props,
      slideToNextInput: true
    };
    rerender(<Title {...newProps} />);
    expect(container).toEquals(props.userEmail);
  });
});
