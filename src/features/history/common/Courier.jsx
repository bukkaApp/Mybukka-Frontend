import React from 'react';
import PropTypes from 'prop-types';
import './courier.scss';

const Courier = ({ courierName, courierImg }) => (
  <div className="courier-history">
    <img src={courierImg} className="courier-img" alt="courier" />
    <h6 className="">{courierName}</h6>
  </div>
);

export default Courier;

Courier.propTypes = {
  courierName: PropTypes.string.isRequired,
  courierImg: PropTypes.string.isRequired
};
