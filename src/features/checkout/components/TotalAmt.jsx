import React from 'react';
import './suggestedItems.scss';

const totalAmount = () => (
  <div className="container mt-2">
    <div className="d-flex justify-content-between">
      <h5 className="font-size-14 ml-3 text-muted">Subtotal</h5>
      <h5 className="font-size-14 text-muted">TBD</h5>
    </div>
    <div className="d-flex justify-content-between">
      <h5 className="font-size-14 ml-3 text-muted">Tax & Fees</h5>
      <h5 className="font-size-14 text-muted">TBD</h5>
    </div>
    <div className="d-flex justify-content-between">
      <h5 className="font-size-14 ml-3 text-muted">Delivery</h5>
      <h5 className="font-size-14 text-muted">TBD</h5>
    </div>
    <div className="d-flex flex-column mt-3">
      <h5 className="font-size-14 ml-3 text-success">
        Do you have a promo code?
      </h5>
      <div className="d-flex justify-content-between border-bottom ml-3 pb-4 mb-2" />
    </div>
    <div className="d-flex justify-content-between mt-3 mb-4">
      <h5 className="font-size-14 ml-3 text-muted">Total</h5>
      <h5 className="font-size-14 text-muted">TBD</h5>
    </div>
  </div>
);

export default totalAmount;
