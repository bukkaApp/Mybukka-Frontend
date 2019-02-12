import React, { Fragment } from 'react';
import Checkout from './components/Checkout';
import Modal from './common/modal';

const checkoutPage = () => (
  <Fragment>
    <Checkout />
    <Modal />
  </Fragment>
);

export default checkoutPage;
