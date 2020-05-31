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

import chargeUser from '../actionCreators/chargeUser';
import DeliveryAddress from './DeliveryAddress';
import Schedules from './Schedules';
import Demarcation from '../common/SmallScreenDivider';
import Payments from '../../../components/payment';
import ShoppingCart from './ShoppingCart';
import postUserOrder from '../actionCreators/postUserOrder';

import './checkout.scss';
import useFetchedRestaurant from '../context/useFetchedRestaurant';
import useLocationWithinDistance from '../context/useLocationWithinDistance';
import { useLocationContext } from '../../../context/LocationContext';
import { useUserContext } from '../../../context/UserContext';

const Checkout = ({
  checkoutUser,
  cart,
  fetchBukkaMenu,
  menuIsFetched,
  bukkaOfMenu,
  day,
  time,
  mode,
  fetchBukka,
  bukkaSlug,
  bukkaCoordinates,
}) => {
  const { coordinates } = useLocationContext();
  const { card: cards } = useUserContext();
  const [isWithinDeliveryRange, validateUserLocationRange] = useLocationWithinDistance(coordinates, bukkaCoordinates);

  useFetchedRestaurant(fetchBukka, fetchBukkaMenu, menuIsFetched, bukkaOfMenu);

  const handleUserCheckout = () => {
    const user = authServices.getUserSlug();// ...deliveryAddressData,
    const deliveryAddress = { user, location: { type: 'Point', coordinates, } };
    checkoutUser({ deliveryAddress, cart: { items: [...cart], user }, day, bukkaSlug, time, deliveryMode: mode });
  };

  const handleCheckout = () => {
    validateUserLocationRange();
    if (cards.length <= 0) {
      swal('Please save your card before proceeding to checkout');
    } else if (!isWithinDeliveryRange) {
      scrollTo(0, 0);
      // setValidationErrors({
      //   ...validationErrors,
      //   address: 'Sorry, this restaurant is not within your location',
      // });
    } else {
      handleUserCheckout();
    }
  };

  return (
    <>
      <Navbar />
      <Container classNames="relative modal-open p-0">
        <div className="d-flex flex-column flex-xl-row flex-lg-row flex-md-column justify-content-between">
          <div className="col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3 col-md-12 col-12">
            <DeliveryAddress />
            <Schedules />
            <section className="mb-2 mt-4">
              <Demarcation />
              <Payments noPadding />
              <Demarcation />
            </section>
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
  cartReducer: { totalCost, items },
  productsReducer: {
    bukkaMenu,
    status: { fetched }
  },
  businessReducer: { fetchedBukka: { slug: bukkaSlug, location: { coordinates: bukkaCoordinates }, maxDeliveryDistance: bukkaDeliveryDistance } },
  finishTransactionReducer: {
    status: { success },
  },
  deliveryModeReducer: { mode },
  deliveryScheduleReducer: { schedule: { day, time } },
}) => ({
  card: manipulateCardDetailsReducer,
  amount: totalCost,
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
  mode,
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
  fetchBukka: () => {},
};
