import React from 'react';
import PropTypes from 'prop-types';
import PersonalizedHeader from './PersonalizedHeader';
import PersonalizedBody from './PersonalizedBody';

const RecentOrder = ({ order, authenticated }) => {
  if (!authenticated) {
    return null;
  }
  return (
    <div className="col-md-6">
      <PersonalizedHeader title="Recent Order" />
      {order.length > 0 &&
      <PersonalizedBody text={order.text} link={order.link} />
      }
    </div>
  );
};
export default RecentOrder;

RecentOrder.defaultProps = {
  order: []
};

RecentOrder.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string),
  authenticated: PropTypes.bool.isRequired,
};
