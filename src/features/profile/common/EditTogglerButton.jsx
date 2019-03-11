import React from 'react';

import PropTypes from 'prop-types';
import Button from 'Components/button/Button';

const EditTogglerButton = ({ text, handleClick }) => (
  <div className="edit-toggler-button">
    <Button
      type="button"
      handleClick={handleClick}
      text={text}
      classNames="edit-save-toggler d-flex justify-content-end"
    />
  </div>
);

export default EditTogglerButton;

EditTogglerButton.defaultProps = {
  text: '',
  handleClick: () => {},
};

EditTogglerButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
};
