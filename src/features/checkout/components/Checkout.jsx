import React, { Fragment } from 'react';

import Container from 'Components/container';
import Button from 'Components/button/Button';
import DeliveryAddress from './DeliveryAddress';
import Time from './Time';
import Payment from './Payment';
import ShoppingCart from './ShoppingCart';
import MyLocation from '../common/Map';
import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';

import './checkout.scss';

const Checkout = () => (
  <>
    <PrimaryNavbar />
    <Container classNames="relative modal-open">
      <div className="d-flex flex-column flex-xl-row flex-lg-row flex-md-column justify-content-between">
        <div className="col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3 col-md-12 col-12">
          <DeliveryAddress />
          <Time />
          <Payment />
          <div className="d-none d-xl-flex d-lg-flex justify-content-end my-5">
            <Button
              type="submit"
              text="CONTINUE"
              classNames="big-button"
              handleClick={() => {}}
            />
          </div>
        </div>
        <div
          className="col-xl-5 col-lg-5 col-md-12 col-sm-12 mb-2 px-0 px-md-0
        px-lg-3 mt-0 mt-lg-4 mt-xl-4">
          <div className="card-shadow card mb-3 border">
            <div className="map-address d-none d-lg-block d-xl-block">
              <MyLocation />
            </div>
            <ShoppingCart />
          </div>
          <div className="d-flex d-md-flex d-lg-none d-xl-none mt-1 mb-5 justify-content-center">
            <Button
              type="submit"
              text="CONTINUE"
              classNames="big-button"
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>
    </Container>
  </>
);

export default Checkout;
