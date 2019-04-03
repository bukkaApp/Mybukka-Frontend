import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import shortId from 'shortid';
import Container from 'Components/container';
import { connect } from 'react-redux';
import ProfileHeaderTitle from '../../profile/common/ProfileHeaderTitle';
import trackingDisplayOpen from '../actionCreators/trackingDisplayOpen';
import Table from './Table';
import Card from './Card';
import Tracking from './Tracking';

const BgColor = ({ children }) => (
  <div className="bg-color history pt-2 pb-5">
    {children}
  </div>
);

const Transaction = ({ data, openTrackingDropdown }) => (
  <Fragment>
    <BgColor>
      <div className="profile-header-section mb-4">
        <ProfileHeaderTitle firstName="Order" lastName="history" />
      </div>
      <Container classNames="relative d-bg-white-none">
        <div className="d-flex flex-column flex-xl-column
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
    </BgColor>
    <Tracking />
  </Fragment>
);

export default connect(null,
  { openTrackingDropdown: trackingDisplayOpen }
)(Transaction);

Transaction.defaultProps = {
  data: {}
};

Transaction.propTypes = {
  openTrackingDropdown: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string)
    ])
  ))
};

BgColor.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
