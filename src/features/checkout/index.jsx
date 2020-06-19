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

  useEffect(() => () => {
    resetAddressReport();
    resetPaymentReport();
  }, []);

  const handleCheckout = () => {
    const useDefaultAddress = !changePayment && card && card.cards.length ? true : paymentValid;
    const useDefaultCard = !changeAddress && address && address.addresses.length ? true : addressValid;
    setState({ ...state, address: useDefaultAddress, payment: useDefaultCard });
    if (useDefaultAddress && useDefaultCard) {
      console.log('validated and ready', state.address && state.payment);
      return;
    }
    const message = `Please fill out the ${!useDefaultAddress ? 'address' : 'payment'} form`;
    setToast({ message, type: 'error' });
    const report = { req: true, change: true };
    if (!useDefaultCard) setPaymentReport(report);
    if (!useDefaultAddress) setAddressReport();
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
