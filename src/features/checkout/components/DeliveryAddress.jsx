import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';

import './checkout.scss';
import Demarcation from '../common/SmallScreenDivider';
import Address from '../../../components/address';
import TemporaryWrapper from '../../../components/ViewWrappers/TemporaryWrapper';

const Pickup = ({ title, name }) => (
  <TemporaryWrapper.ViewWrapper>
    <h2 className="font-size-16">{title}</h2>
    <ul className="list-group mt-2">
      <li className="list-group-item">{name}</li>
    </ul>
  </TemporaryWrapper.ViewWrapper>
);

const Delivery = ({
  mode,
  address,
  logistics,
}) => {
  const decodeReadyMoment = () => {
    if (!logistics) return '45 min';
    if (logistics.deliveryTimeTo <= 60) return `${logistics.deliveryTimeTo} min`;
    return `${(logistics.deliveryTimeTo / 60).toFixed(2)} hour`;
  };

  return (
    <Fragment>
      <div className="mt-sm-4 Delivery-Pickup--border">
        <DeliveryOrPickupNav />
      </div>
      <Demarcation />
      {mode === 'delivery' && <Address useModal noPadding />}
      {mode === 'pickup' && (
        <Fragment>
          <Pickup title="Pickup Address" name={address} />
          <Pickup title="Pickup time" name={`Ready in ${decodeReadyMoment()}`} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  businessReducer: {
    fetchedBukka: { address, logistics }
  }
}) => ({
  mode,
  address,
  logistics
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
