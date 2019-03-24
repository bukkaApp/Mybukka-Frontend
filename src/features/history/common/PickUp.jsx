import React from 'react';
import PropTypes from 'prop-types';

const PickUp = ({ title, pickupAddress, pickupContactMobile }) => (
  <div>
    <h5 className="text-uppercase font-size-14">{title}</h5>
    <h5 className="text-capitalize font-size-14">
      {pickupAddress}
    </h5>
    <h5 className="font-size-14">{pickupContactMobile}</h5>
  </div>
);

export default PickUp;

PickUp.propTypes = {
  title: PropTypes.string.isRequired,
  pickupAddress: PropTypes.string.isRequired,
  pickupContactMobile: PropTypes.string.isRequired
};
