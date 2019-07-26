import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map from 'Components/map';
import Navbar from 'Components/navbar';
import Container from 'Components/container';
import Button from 'Components/button/Button';

import SendSecurityKeyForm from './SendSecurityKeyForm';
import chargeUser from '../actionCreators/chargeUser';
import DeliveryAddress from './DeliveryAddress';
import Time from './Time';
import Payment from './Payment';
import ShoppingCart from './ShoppingCart';
import VerifyPhone from '../../verifyPhone';

import './checkout.scss';

const Checkout = ({ push, checkoutUser, card, amount, message, data }) => {
  useEffect(() => {
    if (message === 'Charge attempted') {
      $('#inputSecurityKey').modal('show');
    }
  });

  return (
    <>
      <VerifyPhone />
      <Navbar push={push} />
      <SendSecurityKeyForm />
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
                handleClick={() => checkoutUser({ card, amount })}
              />
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-5 col-md-12 col-sm-12 mb-2 px-0 px-md-0
        px-lg-3 mt-0 mt-lg-4 mt-xl-4"
          >
            <div className="card-shadow card mb-3 border">
              <div className="map-address d-none d-lg-block d-xl-block">
                <Map />
              </div>
              <ShoppingCart />
            </div>
            <div className="d-flex d-md-flex d-lg-none d-xl-none mt-1 mb-5 justify-content-center">
              <Button
                type="submit"
                text="CONTINUE"
                classNames="big-button"
                id="charge-user-small"
                handleClick={() => checkoutUser({ card, amount })}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({
  manipulateCardDetailsReducer,
  chargeUserReducer: { message, data },
  fetchBukkaMenuReducer: { totalPriceInCart },
}) => ({
  card: manipulateCardDetailsReducer,
  amount: totalPriceInCart,
  message,
  data,
});

export default connect(
  mapStateToProps,
  { checkoutUser: chargeUser },
)(Checkout);

Checkout.propTypes = {
  push: PropTypes.func.isRequired,
};
