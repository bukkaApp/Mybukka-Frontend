import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Container from 'Components/container';
import { connect } from 'react-redux';
import ProfileHeaderTitle from '../../profile/common/ProfileHeaderTitle';
import trackingDisplayOpen from '../actionCreators/trackingDisplayOpen';
import Table from './Table';
import Card from './Card';
import Tracking from './Tracking';
import getOrderHistory from '../actionCreators/getOrderHistory';

const BgColor = ({ children }) => (
  <div className="bg-color history pt-2 pb-5">
    {children}
  </div>
);

const Transaction = ({
  userOrders,
  fetched,
  openTrackingDropdown,
  fetchedOrderHistory
}) => {
  const [refreshed, refresh] = useState(false);

  const extractPrice = dom => dom.cart.items
    .map(item => item.meal.price)
    .reduce((prev, curr) => prev + curr, 0);

  const extractQuantity = dom => dom.cart.items
    .map(item => item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    if (!refreshed && !fetched) {
      refresh(true);
      fetchedOrderHistory('/order?role=customer');
    }
  }, [refreshed, fetched]);

  return (
    <Fragment>
      <BgColor>
        <div className="profile-header-section mb-4">
          <ProfileHeaderTitle firstName="Order" lastName="history" />
        </div>
        {(userOrders && userOrders.length > 0) &&
        <Container classNames="relative d-bg-white-none">
          <div
            className="d-flex flex-column flex-xl-column
        flex-lg-column flex-md-column justify-content-between"
          >
            <Table
              extractPrice={extractPrice}
              extractQuantity={extractQuantity}
              data={userOrders}
              handleClick={openTrackingDropdown}
            />
            {userOrders.map(order => (
              <Card
                key={`order-transaction-card-${order._id}--${order.status}`}
                handleClick={() => openTrackingDropdown(order.status)}
                time={order.time}
                orderId={order._id} // eslint-disable-line
                mealTitle={order.cart.items[0].meal.title}
                price={extractPrice(order)}
                status={order.status}
                quantity={extractQuantity(order)}
              />
            ))}
          </div>
        </Container>
        }
      </BgColor>
      <Tracking />
    </Fragment>
  );
};

const mapStateToProps = ({
  getOrderHistoryReducer: { orderHistory: { userOrders }, status: { fetched, error } },
}) => ({
  fetched,
  error,
  userOrders
});

export default connect(
  mapStateToProps,
  {
    openTrackingDropdown: trackingDisplayOpen,
    fetchedOrderHistory: getOrderHistory
  }
)(Transaction);

Transaction.defaultProps = {
  userOrders: []
};

Transaction.propTypes = {
  fetched: PropTypes.bool.isRequired,
  fetchedOrderHistory: PropTypes.func.isRequired,
  openTrackingDropdown: PropTypes.func.isRequired,
  userOrders: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.string)
      ])
    )
  )
};

BgColor.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
