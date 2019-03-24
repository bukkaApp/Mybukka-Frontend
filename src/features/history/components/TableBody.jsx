import React from 'react';
import PropTypes from 'prop-types';
import Courier from '../common/Courier';
import PickUp from '../common/PickUp';
import Price from '../common/Price';
import Order from '../common/Order';
import Status from '../common/Status';
import DropOff from '../common/DropOff';

const Col = ({ children }) => (<div
  className="col-xl-2 col-lg-2 col-md-10 pt-3 border"
>
  {children}
</div>);

const Row = ({ children, handleClick }) => (
  <div
    onClick={handleClick}
    role="button"
    aria-pressed="false"
    tabIndex="0"
    className="row flex flex-xl-row flex-lg-row d-xl-flex d-lg-flex d-md-none
    d-none cursor-pointer"
  >
    {children}
  </div>
);

const TableBody = ({
  handleClick,
  time,
  status,
  quantity,
  title,
  price,
  orderId,
  courierName,
  courierImg,
  pickupAddress,
  pickupContactMobile,
  deliveryAddress,
  deliveryName,
  deliveryContactMobile
}) => (
  <Row
    handleClick={handleClick}
  >
    <Col>
      <Status status={status} time={time} />
    </Col>
    <Col>
      <PickUp
        title={title}
        pickupAddress={pickupAddress}
        pickupContactMobile={pickupContactMobile}
      />
    </Col>
    <Col>
      <DropOff
        deliveryName={deliveryName}
        deliveryContactMobile={deliveryContactMobile}
        deliveryAddress={deliveryAddress}
      />
    </Col>
    <Col>
      <Order quantity={quantity} orderId={orderId} />
    </Col>
    <Col>
      <Price price={price} />
    </Col>
    <Col>
      <Courier courierName={courierName} courierImg={courierImg} />
    </Col>
  </Row>
);

export default TableBody;

TableBody.propTypes = {
  handleClick: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  courierName: PropTypes.string.isRequired,
  courierImg: PropTypes.string.isRequired,
  pickupAddress: PropTypes.string.isRequired,
  pickupContactMobile: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryName: PropTypes.string.isRequired,
  deliveryContactMobile: PropTypes.string.isRequired,
};

Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Row.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
