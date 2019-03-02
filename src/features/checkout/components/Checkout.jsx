import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map from 'Components/map';
import Navbar from 'Components/navbar';
import Container from 'Components/container';
import Button from 'Components/button/Button';
import AddToCart from 'Components/common/addToCart';
import duration from 'Components/common-navs/inputData/duration';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';

import SendSecurityKeyForm from './SendSecurityKeyForm';
import chargeUser from '../actionCreators/chargeUser';
import DeliveryAddress from './DeliveryAddress';
import ScheduleSelector from './ScheduleSelector';
import Payment from './Payment';
import ShoppingCart from './ShoppingCart';

import './checkout.scss';

const Checkout = ({
  push,
  checkoutUser,
  card,
  amount,
  message,
  data,
  bukkaMenu,
  fetchBukkaMenu,
  menuIsFetched,
  bukkaOfMenu
}) => {
  useEffect(() => {
    const bukkaMenuToFetch = location.pathname.split('/')[2];
    if (!menuIsFetched || bukkaMenuToFetch !== bukkaOfMenu) {
      fetchBukkaMenu(bukkaMenuToFetch);
    }
    if (message === 'Charge attempted') {
      $('#inputSecurityKey').modal('show');
    }
  });

  return (
    <>
      <Navbar push={push} />
      <AddToCart />
      <SendSecurityKeyForm />
      <Container classNames="relative modal-open">
        <div className="d-flex flex-column flex-xl-row flex-lg-row flex-md-column justify-content-between">
          <div className="col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3 col-md-12 col-12">
            <DeliveryAddress />
            <ScheduleSelector type="day" title="Day" list={duration.durationList} />
            <ScheduleSelector type="time" title="Time" list={duration.sheduleTimeLists} />
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
  cartReducer: { totalCost, items },
  fetchBukkaMenuReducer: { bukkaMenu, status: { fetched } }
}) => ({
  card: manipulateCardDetailsReducer,
  amount: totalCost,
  message,
  data,
  bukkaMenu,
  menuIsFetched: fetched,
  bukkaOfMenu: bukkaMenu[0].bukka
});

export default connect(
  mapStateToProps,
  { checkoutUser: chargeUser, fetchBukkaMenu: fetchBukkaMenuAction }
)(Checkout);

Checkout.propTypes = {
  push: PropTypes.func.isRequired
};
