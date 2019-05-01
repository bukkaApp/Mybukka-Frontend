import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import shortId from 'shortid';
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
  orderHistory,
  fetched,
  openTrackingDropdown,
  fetchedOrderHistory
}) => {
  const [refreshed, refresh] = useState(false);

  useEffect(() => {
    if (!refreshed && !fetched) {
      refresh(true);
      fetchedOrderHistory('/order');
    }
  });

  return (
    <Fragment>
      <BgColor>
        <div className="profile-header-section mb-4">
          <ProfileHeaderTitle firstName="Order" lastName="history" />
        </div>
        {orderHistory.length >= 1 &&
        <Container classNames="relative">
          <div
            className="d-flex flex-column flex-xl-column
        flex-lg-column flex-md-column justify-content-between"
          >
            <Table data={orderHistory} handleClick={openTrackingDropdown} />
            {orderHistory.map(dom => (
              <Card
                handleClick={() => openTrackingDropdown(dom.status)}
                time={dom.time}
                orderId={dom.orderId}
                mealTitle={dom.title}
                price={dom.price}
                key={shortId.generate() + dom.title}
                status={dom.status}
                quantity={dom.quantity}
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
  getOrderHistoryReducer: { orderHistory, status: { fetched, error } },
}) => ({
  fetched,
  error,
  orderHistory
});

export default connect(
  mapStateToProps,
  {
    openTrackingDropdown: trackingDisplayOpen,
    fetchedOrderHistory: getOrderHistory
  }
)(Transaction);

Transaction.defaultProps = {
  orderHistory: []
};

Transaction.propTypes = {
  fetched: PropTypes.bool.isRequired,
  fetchedOrderHistory: PropTypes.func.isRequired,
  openTrackingDropdown: PropTypes.func.isRequired,
  orderHistory: PropTypes.arrayOf(
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
