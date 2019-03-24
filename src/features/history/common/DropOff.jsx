import React from 'react';
import PropTypes from 'prop-types';

const DropOff = ({ deliveryName, deliveryAddress, deliveryContactMobile }) => (
  <div className="dropoff">
    <h6 className="font-size-16">{deliveryName}</h6>
    <h6 className="font-size-14">{deliveryAddress}</h6>
    <h6 className="font-size-14">{deliveryContactMobile}</h6>
  </div>
);

export default DropOff;

DropOff.propTypes = {
  deliveryName: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryContactMobile: PropTypes.string.isRequired
};
