import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ data, handleClick }) => (
  <div
    className="d-flex flex-column flex-xl-column flex-lg-column flex-md-column
    justify-content-between"
  >
    <TableHead />
    {data.map(dom => (
      <TableBody
        key={shortId.generate() + dom.title}
        handleClick={() => handleClick(dom.status)}
        time={dom.time}
        status={dom.status}
        quantity={dom.quantity}
        title={dom.title}
        price={dom.price}
        orderId={dom.orderId}
        courierName={dom.courier.name}
        courierImg={dom.courier.img}
        pickupAddress={dom.pickup.address}
        pickupContactMobile={dom.pickup.contactMobile}
        deliveryAddress={dom.delivery.address}
        deliveryName={dom.delivery.name}
        deliveryContactMobile={dom.delivery.contactMobile}
      />
    ))}
  </div>
);

export default Table;

Table.propTypes = {
  handleClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string)
    ])
  )).isRequired
};
