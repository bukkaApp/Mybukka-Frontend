import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';

import './payment.scss';
import Demarcation from '../common/SmallScreenDivider';
import Address from '../../../components/address/Address';

const Pickup = ({ title, name }) => (
  <section className="px-3 px-md-3 px-lg-0 mb-2 mt-4">
    <h2 className="font-size-16">{title}</h2>
    <ul className="list-group mt-2">
      <li className="list-group-item">{name}</li>
    </ul>
  </section>
);

const Delivery = ({
  mode,
  address,
}) => (
  <div className="mb-2 mt-4">
    <h1 className="font-size-36 px-3 px-md-3 px-lg-0">Checkout</h1>
    <div className="col-md-12 col-lg-6 p-0 mt-4 Delivery-Pickup--border">
      <DeliveryOrPickupNav />
    </div>
    <Demarcation />
    {mode === 'delivery' && <Address withFormSpace withPadding label="Delivery Address" />}
    {mode === 'pickup' && (
      <Fragment>
        <Pickup title="Pickup Address" name={address} />
        <Pickup title="Pickup time" name="Ready in 20 min" />
      </Fragment>
    )}
  </div>
);

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  businessReducer: {
    fetchedBukka: { address }
  }
}) => ({
  mode,
  address
});

export default connect(mapStateToProps)(Delivery);

Delivery.defaultProps = {
  mode: 'delivery'
};

Delivery.propTypes = {
  mode: PropTypes.string
};

Pickup.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
