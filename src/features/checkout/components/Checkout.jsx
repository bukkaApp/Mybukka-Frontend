/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import logOut from 'Components/navbar/actionCreators/logOut';
import authServices from 'Utilities/authServices';
import Map from 'Components/map';
import Navbar from 'Components/navbar';
import Container from 'Components/container';
import Button from 'Components/button/Button';
import AddToCart from 'Components/common/addToCart';
import duration from 'Components/common-navs/inputData/duration';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import fetchBukkaAction from 'Redux/fetchBukkaAction';

import { validateAField, validateAllFields } from '../validation/validateField';

import SendSecurityKeyForm from './SendSecurityKeyForm';
import chargeUser from '../actionCreators/chargeUser';
import DeliveryAddress from './DeliveryAddress';
import ScheduleSelector from './ScheduleSelector';
import Payment from './Payment';
import ShoppingCart from './ShoppingCart';
import VerifyPhone from '../../verifyPhone';
import postUserOrder from '../actionCreators/postUserOrder';

import './checkout.scss';

const Checkout = ({
  push,
  chargeUserToSaveCard,
  checkoutUser,
  message,
  cart,
  fetchBukkaMenu,
  menuIsFetched,
  bukkaOfMenu,
  day,
  time,
  success,
  cards,
  hasDefaultCard,
  coordinates,
  mode,
  signOut,
  fetchBukka,
  selectedLocation: { description },
  bukkaSlug,
  openNewWindow,
  url,
}) => {
  const [validationErrors, setValidationErrors] = useState({
    address: '',
    deliveryInstructions: '',
    name: '',
    mobileNumber: ''
  });

  const [deliveryAddressData, setDeliveryAddressData] = useState({
    address: description || '',
    deliveryInstructions: '',
    name: authServices.getFullName(),
    mobileNumber: ''
  });

  const handleDeliveryAddress = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setDeliveryAddressData({
      ...deliveryAddressData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleDeliveryAddressSave = (e) => {
    e.preventDefault();
    const validation = validateAllFields(deliveryAddressData);
    setValidationErrors({
      ...validationErrors,
      ...validation
    });
  };

  const validateAddress = () => {
    const { errors, passes } = validateAllFields(deliveryAddressData);
    setValidationErrors({
      ...validationErrors,
      ...errors
    });
    return passes;
  };

  useEffect(() => {
    if (message === 'Charge attempted' && url === '') {
      $('#inputSecurityKey').modal('show');
    }
  });

  useEffect(() => {
    scrollTo(0, 0);
    const bukkaMenuToFetch = location.pathname.split('/')[2];
    if (!menuIsFetched || bukkaMenuToFetch !== bukkaOfMenu) {
      fetchBukkaMenu(bukkaMenuToFetch);
      fetchBukka(bukkaMenuToFetch);
    }
  }, []);

  useEffect(() => {
    const currentPage = location.pathname;
    if (!authServices.getToken()
    || !authServices.isValid(authServices.getToken())) {
      signOut();
      setTimeout(() => {
        swal('You need to login first');
        return push(`/login?next=${currentPage}`);
      }, 2000);
    }
  });

  const handleUserCheckout = () => {
    const user = authServices.getUserSlug();
    const deliveryAddress = { ...deliveryAddressData, user, location: { type: 'Point', coordinates, } };
    checkoutUser({ deliveryAddress, cart: { items: [...cart], user }, day, bukkaSlug, time, deliveryMode: mode });
  };

  const handleCheckout = () => {
    if (cards.length <= 0) {
      swal('Please save your card before proceeding to checkout');
    } else if (!hasDefaultCard) {
      swal('Please select your card');
    } else if (!validateAddress()) {
      scrollTo(0, 0);
    } else {
      handleUserCheckout();
    }
  };

  return (
    <>
      <VerifyPhone />
      <Navbar push={push} />
      <AddToCart />
      <SendSecurityKeyForm openNewWindow={openNewWindow} cart={cart} deliveryAddress={deliveryAddressData} day={day} time={time} push={push} />
      <Container classNames="relative modal-open p-0">
        <div className="d-flex flex-column flex-xl-row flex-lg-row flex-md-column justify-content-between">
          <div className="col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3 col-md-12 col-12">
            <DeliveryAddress
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
              inputData={deliveryAddressData}
              setInputData={setDeliveryAddressData}
              handleDeliveryAddressSave={handleDeliveryAddressSave}
              handleChange={handleDeliveryAddress}
            />
            <ScheduleSelector
              type="day"
              title="Day"
              list={duration.durationList}
            />
            <ScheduleSelector
              type="time"
              title="Time"
              list={duration.sheduleTimeLists}
            />
            <Payment handleClick={chargeUserToSaveCard} cards={cards} message={message} />
            <div className="d-none d-xl-flex d-lg-flex justify-content-end my-5">
              <Button
                type="submit"
                text="CONTINUE"
                classNames="big-button"
                handleClick={() => handleCheckout()}
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
                handleClick={() => handleCheckout()}
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
  chargeUserReducer: { message, data, url },
  // fetchBukkaMenuReducer: { totalPriceInCart },
  selectedLocationReducer: { selectedLocation },
  cartReducer: { totalCost, items },
  fetchBukkaMenuReducer: {
    bukkaMenu,
    status: { fetched }
  },
  fetchBukkaReducer: { fetchedBukka: { slug: bukkaSlug } },
  getUserCardReducer: { cards, hasDefaultCard },
  finishTransactionReducer: {
    status: { success },
  },
  deliveryModeReducer: { mode },
  selectedLocationReducer: { coordinates },
  deliveryScheduleReducer: { schedule: { day, time } },
}) => ({
  card: manipulateCardDetailsReducer,
  amount: totalCost,
  message,
  data,
  bukkaMenu,
  bukkaSlug,
  menuIsFetched: fetched,
  bukkaOfMenu: bukkaMenu[0].bukka,
  cart: items,
  day,
  time,
  success,
  cards,
  hasDefaultCard,
  coordinates,
  mode,
  selectedLocation,
  url,
});

export default connect(
  mapStateToProps,
  { chargeUserToSaveCard: chargeUser,
    checkoutUser: postUserOrder,
    fetchBukkaMenu: fetchBukkaMenuAction,
    signOut: logOut,
    fetchBukka: fetchBukkaAction,
  }
)(Checkout);

Checkout.propTypes = {
  push: PropTypes.func.isRequired,
};

Checkout.defaultProps = {
  message: '',
  cart: [{}],
  menuIsFetched: false,
  bukkaOfMenu: '',
  day: '',
  time: '',
  success: false,
  cards: [{}],
  hasDefaultCard: false,
  fetchBukka: () => {},
};

Checkout.propTypes = {
  fetchBukka: PropTypes.func,
  push: PropTypes.func.isRequired,
  chargeUserToSaveCard: PropTypes.func.isRequired,
  checkoutUser: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  cart: PropTypes.arrayOf([PropTypes.object]).isRequired,
  fetchBukkaMenu: PropTypes.func.isRequired,
  menuIsFetched: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])).isRequired,
  bukkaOfMenu: PropTypes.string,
  day: PropTypes.string,
  time: PropTypes.string,
  success: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.object),
  hasDefaultCard: PropTypes.bool,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  mode: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};
