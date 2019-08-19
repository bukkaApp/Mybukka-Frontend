import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/button/Button';
import Row from 'Components/grid/Row';
import Cancel from 'Components/icons/Cancel';

const TrackingHeader = ({ open, handleClick }) => (
  <div
    className={`
    ${open ? 'position-fixed' : 'position-relative'}
    tracking-content-header`}
  >
    <Row classNames="m-0 tracking-header">
      <Button
        type="button"
        handleClick={handleClick}
        classNames="tracking-cancel-btn"
      >
        <Cancel />
      </Button>
      <h5>Transaction Details</h5>
    </Row>
    <hr className="text-muted m-0 border-box col-12" />
  </div>
);

export default TrackingHeader;

TrackingHeader.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
