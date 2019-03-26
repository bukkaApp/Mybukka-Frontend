import React from 'react';
import Status from '../common/Status';

describe('Status component', () => {
  const props = {
    status: 'pending',
    time: '27/3/2019 12:50 am',
  };

  const { rerender, container } = render(<Status {...props} />);

  it('renders properly', () => {
    expect(container).toMatchSnapshot();
  });

  it('re renders properly when delivered status', () => {
    const newProps = {
      ...props,
      status: 'delivered',
    };
    rerender(<Status {...newProps} />);
    expect(container).toMatchSnapshot();
  });

  it('re renders properly when rejected status', () => {
    const newProps = {
      ...props,
      status: 'cancelled',
    };
    rerender(<Status {...newProps} />);
    expect(container).toMatchSnapshot();
  });
});
