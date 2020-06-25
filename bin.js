/* eslint-disable max-len */
/* eslint-disable brace-style */
import React, { Fragment, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { connect } from 'react-redux';
import Checkout from './components/Checkout';
import FooterBigScreen from '../../components/footer/FooterBigScreen';
import postUserOrder from './actionCreators/postUserOrder';
// import useFetchedRestaurant from './context/useFetchedRestaurant';
import { useUserContext } from '../../context/UserContext';
// import useLocationDistanceContext from './context/useLocationDistanceContext';
import { useToastContext } from '../../context/ToastContext';
import { useFormReportContext } from '../../context/FormReportContext';
import useHashLinkUpdate from '../../hooks/useHashLinkUpdate';
// import { useAddresContext } from '../../context/AddressContext';


const CheckoutPage = () => {
  const [state, setState] = useState({ address: null, payment: null });

  useHashLinkUpdate();
  // const { location, push } = useHistory();
  const isBigScreen = useMediaQuery({ minWidth: 992 });
  const { setToast } = useToastContext();

  const { card, address } = useUserContext();

  const {
    setAddressReport, addressValid, changeAddress, changePayment,
    paymentValid, setPaymentReport, resetAddressReport, resetPaymentReport } = useFormReportContext();

  // const [addressForm] = useAddresContext();
  // const isWithinDeliveryRange = useLocationDistanceContext(coordinates, bukkaCoordinates);

  // useFetchedRestaurant(fetchBukka, fetchBukkaMenu, menuIsFetched, bukkaOfMenu);

  useEffect(() => () => {
    resetAddressReport();
    resetPaymentReport();
  }, []);

  const handleCheckout = () => {
    const handleUserCheckout = () => {
      if (!state.address || !state.payment) return;
      console.log('validated and ready', state.address && state.payment);
      // const deliveryAddressData = (address && address.addresses.filter(loc => loc.slug !== address)) || null;
      // const deliveryAddress = { user, location: { type: 'Point', coordinates, }, ...deliveryAddressData, };
      // checkoutUser({ deliveryAddress, cart: { items: [...cart], user: user.slug }, day, bukkaSlug, time, deliveryMode: mode });
    };

    const validateForm = () => {
      const useDefaultAddress = !changePayment && card && card.cards.length ? true : paymentValid;
      const useDefaultCard = !changeAddress && address && address.addresses.length ? true : addressValid;
      setState({ ...state, address: useDefaultAddress, payment: useDefaultCard });
      if (useDefaultAddress && useDefaultCard) {
        console.log('validated and ready', state.address && state.payment);
      };
      const message = `Please fill out the ${!useDefaultAddress ? 'address' : 'payment'} form`;
      setToast({ message, type: 'error' });
      return setAddressReport({ req: true, change: true });
    };

    // const validateAddressForm = () => {
    //   if (!changeAddress && address && address.addresses.length) {
    //     return setState({ ...state, address: true });
    //   } else if (addressValid || paymentValid) return setState({ ...state, address: true });
    //   setToast({ message: 'Please fill out the address form', type: 'error' });
    //   return setAddressReport({ req: true, change: true });
    // };

    // const validatePaymentForm = () => {
    //   // setPaymentReport({ req: null });
    //   // console.log(!changePayment && card && card.cards.length > 0);
    //   if (!changePayment && card && card.cards.length) {
    //     return setState({ ...state, payment: true });
    //   } else if (paymentValid) return setState({ ...state, payment: true });
    //   setToast({ message: 'Please fill in the payment form', type: 'error' });
    //   return setPaymentReport({ req: true, change: true });
    // };
    gateway_response, payStackMsg
    // validateAddressForm();
    // validatePaymentForm();

    validateForm();
    handleUserCheckout();
    //  else if (!isWithinDeliveryRange) {
    //   setToast({ message: 'Sorry, this restaurant is not within your location', type: 'error' });
    // }
  };

  return (
    <Fragment>
      <Checkout handleCheckout={handleCheckout} />
      {!isBigScreen &&
      <FooterBigScreen handleClick={handleCheckout} noPadding text="Get It Now" fixed />}
    </Fragment>
  );
};

export default connect(
  () => ({}),
  {
    checkoutUser: postUserOrder,
  }
)(CheckoutPage);

CheckoutPage.propTypes = {};
