import React from 'react';
import PropTypes from 'prop-types';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ data, handleClick, extractPrice, extractQuantity }) => (
  <div
    className="d-flex flex-column flex-xl-column flex-lg-column flex-md-column
      justify-content-between"
  >
    <TableHead />
    {data.map(order => (
      <TableBody
        key={`order-table-title-${order._id}-${order.status}`}
        handleClick={() => handleClick(order.status)}
        time={order.time}
        status={order.status}
        quantity={extractQuantity(order)}
        title={order.cart.items[0].meal.title}
        price={extractPrice(order)}
        orderId={order._id.slice(0, 18)}// eslint-disable-line
        courierName={/* order.courier.name || */'Default carier'}
        courierImg={/* order.courier.img || */'http://i.pravatar.cc/50'}
        pickupAddress={order.deliveryAddress.address}
        pickupContactMobile={order.deliveryAddress.contactMobile}
        deliveryAddress={order.deliveryAddress.address}
        deliveryName={order.deliveryAddress.name}
        deliveryContactMobile={order.deliveryAddress.contactMobile}
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
  )).isRequired,
  extractPrice: PropTypes.func.isRequired,
  extractQuantity: PropTypes.func.isRequired,
};
