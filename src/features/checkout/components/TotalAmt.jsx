import React from 'react';

import { connect } from 'react-redux';
import Container from 'Components/container';

import './suggestedItems.scss';

const totalAmount = ({ totalPriceInCart, deliveryPrice }) => {
  // percentage charge
  const pctCharge = (5 / 100) * totalPriceInCart;

  return (
    <Container classNames="total-amount-section">
      <div className="before-grand-total-section">
        <div className="d-flex justify-content-between">
          <h5 className="text-sub-total">Subtotal</h5>
          <h5 className="tbd-price">{totalPriceInCart || 'TBD'}</h5>
        </div>
        <div className="d-flex justify-content-between">
          <h5 className="text-sub-total">Tax & Fees</h5>
          <h5 className="tbd-price">{pctCharge || 'TBD' }</h5>
        </div>
        <div className="d-flex justify-content-between">
          <h5 className="text-sub-total">Delivery</h5>
          <h5 className="tbd-price">{deliveryPrice || 'TDB'}</h5>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3 mb-1">
        <h5 className="text-sub-total">Total</h5>
        <h5 className="tbd-price">{totalPriceInCart + deliveryPrice + pctCharge}</h5>
      </div>
    </Container>
  );
};

const mapStateToprops = ({
  cartReducer: { totalCost },
  deliveryModeReducer: { mode },
  businessReducer: { fetchedBukka },
}) => {
  const deliveryCost = (fetchedBukka.logistics && fetchedBukka.logistics.deliveryPrice) || 0;
  return ({
    totalPriceInCart: totalCost,
    deliveryPrice: mode === 'delivery' ? deliveryCost : 0,
  });
};

export default connect(
  mapStateToprops,
  null
)(totalAmount);
