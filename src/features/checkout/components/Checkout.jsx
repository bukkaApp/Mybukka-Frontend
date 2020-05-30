import React from 'react';

import { connect } from 'react-redux';
import swal from 'sweetalert';

import authServices from 'Utilities/authServices';
import Map from 'Components/map';
import Navbar from 'Components/navbar';
import Container from 'Components/container';
import Button from 'Components/button/Button';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import fetchBukkaAction from 'Redux/fetchBukkaAction';

import SendSecurityKeyForm from './SendSecurityKeyForm';
import chargeUser from '../actionCreators/chargeUser';
import DeliveryAddress from './DeliveryAddress';
import Schedules from './Schedules';
import Payment from '../../../components/payment/Payment';
import ShoppingCart from './ShoppingCart';
import postUserOrder from '../actionCreators/postUserOrder';

import './checkout.scss';
import useChargeAttempted from '../context/useChargeAttempted';
import useFetchedRestaurant from '../context/useFetchedRestaurant';
import useDeliveryState from '../context/useDeliveryState';
import useLocationWithinDistance from '../context/useLocationWithinDistance';
import { useLocationContext } from '../../../context/LocationContext';

const Checkout = ({
  chargeUserToSaveCard,
  checkoutUser,
  message,
  cart,
  fetchBukkaMenu,
  menuIsFetched,
  bukkaOfMenu,
  day,
  time,
  cards,
  hasDefaultCard,
  mode,
  fetchBukka,
  bukkaSlug,
  bukkaCoordinates,
  url,
}) => {
  const { coordinates, selectedLocation: { description } } = useLocationContext();
  const [isWithinDeliveryRange, validateUserLocationRange] = useLocationWithinDistance(coordinates, bukkaCoordinates);

  const {
    useDeliveryData,
    useDeliveryValidation,
    handleDeliveryAddress,
    handleDeliveryAddressSave,
    validateAddress } = useDeliveryState(description);
  const [validationErrors, setValidationErrors] = useDeliveryValidation;
  const [deliveryAddressData, setDeliveryAddressData] = useDeliveryData;

  useChargeAttempted(message, url);

  useFetchedRestaurant(fetchBukka, fetchBukkaMenu, menuIsFetched, bukkaOfMenu);

  const handleUserCheckout = () => {
    const user = authServices.getUserSlug();
    const deliveryAddress = { ...deliveryAddressData, user, location: { type: 'Point', coordinates, } };
    checkoutUser({ deliveryAddress, cart: { items: [...cart], user }, day, bukkaSlug, time, deliveryMode: mode });
  };

  const handleCheckout = () => {
    validateUserLocationRange();
    if (cards.length <= 0) {
      swal('Please save your card before proceeding to checkout');
    } else if (!hasDefaultCard) {
      swal('Please select your card');
    } else if (!validateAddress()) {
      scrollTo(0, 0);
    } else if (!isWithinDeliveryRange) {
      scrollTo(0, 0);
      setValidationErrors({
        ...validationErrors,
        address: 'Sorry, this restaurant is not within your location',
      });
    } else {
      handleUserCheckout();
    }
  };

  return (
    <>
      <Navbar />
      <SendSecurityKeyForm />
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
            <Schedules />
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
  cartReducer: { totalCost, items },
  productsReducer: {
    bukkaMenu,
    status: { fetched }
  },
  businessReducer: { fetchedBukka: { slug: bukkaSlug, location: { coordinates: bukkaCoordinates }, maxDeliveryDistance: bukkaDeliveryDistance } },
  getUserCardReducer: { cards, hasDefaultCard },
  finishTransactionReducer: {
    status: { success },
  },
  deliveryModeReducer: { mode },
  deliveryScheduleReducer: { schedule: { day, time } },
}) => ({
  card: manipulateCardDetailsReducer,
  amount: totalCost,
  message,
  data,
  bukkaCoordinates,
  bukkaDeliveryDistance,
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
  mode,
  url,
});

export default connect(
  mapStateToProps,
  { chargeUserToSaveCard: chargeUser,
    checkoutUser: postUserOrder,
    fetchBukkaMenu: fetchBukkaMenuAction,
    fetchBukka: fetchBukkaAction,
  }
)(Checkout);

Checkout.propTypes = {};

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
