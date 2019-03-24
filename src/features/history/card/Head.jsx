import React from 'react';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';

const Head = ({ orderId, time }) => (
  <Row classNames="justify-content-between text-uppercase">
    <h5 className="font-size-14">#{orderId}</h5>
    <h5 className="font-size-14 suggested-item-price">{time}</h5>
  </Row>
);

export default Head;

Head.propTypes = {
  time: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired
};
