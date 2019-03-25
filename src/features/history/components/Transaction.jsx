import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import shortId from 'shortid';
import Container from 'Components/container';
import { connect } from 'react-redux';
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
  data,
  fetched,
  error,
  openTrackingDropdown,
  fetchedOrderHistory
}) => {
  const [refreshed, refresh] = useState(false);

  useEffect(() => {
    if (!refreshed || !fetched) {
      refresh(true);
      fetchedOrderHistory('/order');
    }
  });

  return (
    <Fragment>
      <BgColor>
        {refreshed && !error &&
        <Container classNames="relative d-bg-white-none">
          <div
            className="d-flex flex-column flex-xl-column
        flex-lg-column flex-md-column justify-content-between"
          >
            <Table data={data} handleClick={openTrackingDropdown} />
            {data.map(dom => (
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
  getOrderHistoryReducer: { status: { fetched, error } },
}) => ({
  fetched,
  error
});

export default connect(
  mapStateToProps,
  {
    openTrackingDropdown: trackingDisplayOpen,
    fetchedOrderHistory: getOrderHistory
  }
)(Transaction);

Transaction.defaultProps = {
  data: {}
};

Transaction.propTypes = {
  fetched: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchedOrderHistory: PropTypes.func.isRequired,
  openTrackingDropdown: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
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
