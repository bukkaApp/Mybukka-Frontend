import React from 'react';
import Button from 'Components/button/Button';
import DeliveryAddress from './DeliveryAddress';
import Time from './Time';
import Payment from './Payment';
import ShoppingCart from './ShoppingCart';
import MyLocation from '../common/Map';
import './checkout.scss';

const checkout = () => (
  <div className="container">
    <div className="row justify-content-between">
      <div className="col-xl-6 col-lg-6 col-md-7 p-45">
        <DeliveryAddress />

        <Time />

        <Payment />

        <div className="d-flex justify-content-end mt-5">
          <Button
            type="submit"
            text="CONTINUE"
            classNames="big-button"
            handleClick={() => {}}
          />
        </div>
      </div>


      <div className="col-xl-5 col-lg-5 col-md-5 p-45 mb-2 mt-4">
        <div className="card-shadow card mb-3">
          <div className="map-address">
            <MyLocation />
          </div>
          <ShoppingCart />
        </div>
      </div>

    </div>
  </div>
);

export default checkout;
