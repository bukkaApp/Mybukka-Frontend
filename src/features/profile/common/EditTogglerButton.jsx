import React from 'react';

import PropTypes from 'prop-types';
import Button from 'Components/button/Button';

const EditTogglerButton = ({ text }) => (
  <div className="edit-toggler-button">
    <Button
      type="button"
      handleClick={() => {}}
      text={text}
      classNames="edit-save-toggler d-flex justify-content-end"
    />
  </div>
);

export default EditTogglerButton;

EditTogglerButton.defaultProps = {
  text: ''
};

EditTogglerButton.propTypes = {
  text: PropTypes.string,
};
