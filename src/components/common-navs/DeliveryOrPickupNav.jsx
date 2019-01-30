import React from 'react';

import './deliveryorpickupnav.scss';

const DeliveryOrPickupNav = () => (
  <div className="btn-group" role="group">
    <button type="button" className="btn-delivery" autoFocus>
      delivery
    </button>
    <button type="button" className="btn-pickup">
      pickup
    </button>
  </div>
);

export default DeliveryOrPickupNav;
