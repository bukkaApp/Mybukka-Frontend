import React from 'react';

import PropTypes from 'prop-types';
import Button from '../button/Button';

import './ButtonPlain.scss';

const ButtonPlain = ({ text, onClick, withPrimaryButton }) => (
  <div className="Button-Plain-Wrapper">
    <Button
      type="button"
      handleClick={onClick}
      text={text}
      classNames={`Button-Plain ${(withPrimaryButton && 'Primary-Color') || 'Button-Plain-Color'}`}
    />
  </div>
);

export default ButtonPlain;

ButtonPlain.defaultProps = {
  text: '',
  onClick: () => {},
};

ButtonPlain.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
