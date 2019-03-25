import React from 'react';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';

const Footer = ({ status, price }) => {
  const colorObj = {
    pending: 'warning',
    delivered: 'success',
    cancelled: 'danger'
  };

  return (
    <Row classNames="justify-content-between text-capitalize">
      <h5 className="font-size-14">Status: <span className={`text-${colorObj[status]}`}> {status}</span></h5>
      <h5 className="text-color font-size-14"> ₦{price}.00</h5>
    </Row>
  );
};

export default Footer;

Footer.propTypes = {
  status: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};
