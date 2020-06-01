import React, { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import fetchBukkaAction from 'Redux/fetchBukkaAction';
import Checkout from './components/Checkout';
import FooterBigScreen from '../../components/footer/FooterBigScreen';
import postUserOrder from './actionCreators/postUserOrder';
import useFetchedRestaurant from './context/useFetchedRestaurant';
import { useUserContext } from '../../context/UserContext';
import { useLocationContext } from '../../context/LocationContext';
import useLocationDistanceContext from './context/useLocationDistanceContext';
import { useToastContext } from '../../context/ToastContext';
import { useGlobalFormValidityRequestContext } from '../../context/GlobalFormValidityRequestContext';
import { useGlobalFormValidityReportContext } from '../../context/GlobalFormValidityReportContext';
import useHashLinkUpdate from '../../hooks/useHashLinkUpdate';
import { useAddresContext } from '../../context/AddressContext';


const CheckoutPage = ({
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
  useHashLinkUpdate();
  const { location, push } = useHistory();
  const isBigScreen = useMediaQuery({ minWidth: 992 });
  const { setToast } = useToastContext();
  const { coordinates, } = useLocationContext();
  const { card, user, address } = useUserContext();
  const { reportAddressValidity, reportPaymentValidity } = useGlobalFormValidityRequestContext();
  const { addressValidity } = useGlobalFormValidityReportContext();
  const [addressForm] = useAddresContext();
  const isWithinDeliveryRange = useLocationDistanceContext(coordinates, bukkaCoordinates);

  useFetchedRestaurant(fetchBukka, fetchBukkaMenu, menuIsFetched, bukkaOfMenu);

  const handleUserCheckout = () => { // ...deliveryAddressData,
    const deliveryAddressData = (address && address.addresses.filter(loc => loc.slug !== address)) || null;
    const deliveryAddress = { user, location: { type: 'Point', coordinates, }, ...deliveryAddressData, };
    checkoutUser({ deliveryAddress, cart: { items: [...cart], user: user.slug }, day, bukkaSlug, time, deliveryMode: mode });
  };

  const handleCheckout = () => {
    console.log('addressForm', addressForm);
    if (!card || card.cards.length <= 0) {
      push(`${location.pathname}#payment`);
      reportPaymentValidity(true);
      setToast({ message: 'Please fill in the payment form and save', type: 'error' });
    } else if ((address && address.addresses.length) || !addressValidity) {
      reportAddressValidity(true);
      push(`${location.pathname}#address`);
      setToast({ message: 'Please fill out the address form', type: 'error' });
    } else if (!isWithinDeliveryRange) {
      setToast({ message: 'Sorry, this restaurant is not within your location', type: 'error' });
    } else {
      setToast({ message: null });
      handleUserCheckout();
    }
  };

  return (
    <Fragment>
      <Checkout handleCheckout={handleCheckout} />
      {!isBigScreen &&
      <FooterBigScreen handleClick={handleCheckout} noPadding text="Get It Now" fixed />}
    </Fragment>
  );
};

const mapStateToProps = ({
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
  {
    checkoutUser: postUserOrder,
    fetchBukkaMenu: fetchBukkaMenuAction,
    fetchBukka: fetchBukkaAction,
  }
)(CheckoutPage);

CheckoutPage.propTypes = {};
