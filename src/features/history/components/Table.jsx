import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ data, handleClick, extractPrice, extractQuantity }) => (
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
        quantity={extractQuantity(dom)}
        title={dom.cart.items[0].meal[0].title}
        price={extractPrice(dom)}
        orderId={dom._id.slice(0, 18)}// eslint-disable-line
        courierName={/* dom.courier.name || */'Default carier'}
        courierImg={/* dom.courier.img || */'http://i.pravatar.cc/50'}
        pickupAddress={dom.deliveryAddress.address}
        pickupContactMobile={dom.deliveryAddress.contactMobile}
        deliveryAddress={dom.deliveryAddress.address}
        deliveryName={dom.deliveryAddress.name}
        deliveryContactMobile={dom.deliveryAddress.contactMobile}
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
