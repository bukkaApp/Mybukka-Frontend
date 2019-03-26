import React from 'react';
import PropTypes from 'prop-types';

const PickUp = ({ title, pickupAddress, pickupContactMobile }) => (
  <div>
    <h5 className="text-uppercase font-size-14">{title}</h5>
    <h5 className="light text-capitalize font-size-13">{pickupAddress}</h5>
    <h5 className="light font-size-13">{pickupContactMobile}</h5>
  </div>
);

export default PickUp;

PickUp.propTypes = {
  title: PropTypes.string.isRequired,
  pickupAddress: PropTypes.string.isRequired,
  pickupContactMobile: PropTypes.string.isRequired
};
