import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ status, time }) => {
  const colorObj = {
    pending: 'warning',
    delivered: 'success',
    cancelled: 'danger'
  };

  return (
    <div className="text-uppercase">
      <h5 className={`font-size-14 text-${colorObj[status]}`}>{status}</h5>
      <h5 className="light font-size-14 suggested-item-price">{time}</h5>
    </div>
  );
};

export default Status;

Status.propTypes = {
  status: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};
