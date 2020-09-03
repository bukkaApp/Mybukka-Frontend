import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';

import './checkout.scss';
import Demarcation from '../common/SmallScreenDivider';
import Address from '../../../components/address';
import TemporaryWrapper from '../../../components/ViewWrappers/TemporaryWrapper';
import { useBusinessContext } from '../../../context/BusinessContext';

const Pickup = ({ title, name }) => (
  <TemporaryWrapper.ViewWrapper>
    <h2 className="font-size-16">{title}</h2>
    <ul className="list-group mt-2">
      <li className="list-group-item">{name}</li>
    </ul>
  </TemporaryWrapper.ViewWrapper>
);

const Delivery = ({ mode }) => {
  const { business } = useBusinessContext();
  const decodeReadyMoment = () => {
    if (business && !business.logistics) return '45 min';
    if (business && business.logistics.deliveryTimeTo <= 60) return `${business.logistics.deliveryTimeTo} min`;
    return `${(business.logistics.deliveryTimeTo / 60).toFixed(2)} hour`;
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
          <Pickup title="Pickup Address" name={(business && business.address) || {}} />
          <Pickup title="Pickup time" name={`Ready in ${decodeReadyMoment()}`} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ deliveryModeReducer: { mode } }) => ({ mode });

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
