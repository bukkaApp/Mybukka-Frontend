import React from 'react';
import TrackingHeader from '../components/TrackingHeader';

describe('TrackingHeader component', () => {
  const props = {
    open: false,
    handleClick: jest.fn(),
  };

  const { rerender, container, getByTestId } = render(<TrackingHeader {...props} />);

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('re renders properly when rejected status', () => {
    const newProps = {
      ...props,
      open: true
    };
    rerender(<TrackingHeader {...newProps} />);
    expect(container).toMatchSnapshot();
  });

  it('triggers the handleclick function when clicked', () => {
    const button = getByTestId('button');
    button.click(button);

    expect(props.handleClick).toBeCalled();
    expect(props.open).toBeFalsy();
  });
});
