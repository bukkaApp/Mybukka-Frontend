import React, { Fragment, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { connect } from 'react-redux';
import Checkout from './components/Checkout';
import FooterBigScreen from '../../components/footer/FooterBigScreen';
import postUserOrder from './actionCreators/postUserOrder';
import { useUserContext } from '../../context/UserContext';
import { useToastContext } from '../../context/ToastContext';
import { useFormReportContext } from '../../context/FormReportContext';
import useHashLinkUpdate from '../../hooks/useHashLinkUpdate';
import useApi from '../../shared/api';
import { useBusinessContext } from '../../context/BusinessContext';
import { useLoadingContext } from '../../context/LoadingContext';
import { useModalContext } from '../../context/ModalContext';


const CheckoutPage = ({ cart, day, time, mode, finishTransaction }) => {
  useHashLinkUpdate();
  const { API } = useApi();
  const { setPaymentSecurityPopup, setModal } = useModalContext();
  const { business } = useBusinessContext();
  const { loading } = useLoadingContext();
  const isBigScreen = useMediaQuery({ minWidth: 992 });
  const { setToast } = useToastContext();

  const { card, address, user, setPayment, setPaymentException, paymentException } = useUserContext();

  const { payment, address: formAddress, resetAddressReport, resetPaymentReport } = useFormReportContext();

  useEffect(() => () => {
    setPaymentException(null);
    resetAddressReport();
    resetPaymentReport();
  }, []);


  useEffect(() => {
    if (paymentException) {
      const availableAddress = formAddress || (address && address.addresses.filter(({ slug }) => slug === address.defaultAddress));
      const deliveryAddress = { ...availableAddress, user: user.slug, };
      const authCode = card.authorization_code;

      const bukkaSlug = (business && business.slug);
      const order = { deliveryAddress, cart: { items: [...cart], user: user.slug }, authCode, day, bukkaSlug, time, deliveryMode: mode };
      // after user has been charged
      API.order.post(order);
    }
  }, [card]);

  const requestSecurityPopup = () => {
    setModal(true);
    setPaymentSecurityPopup(true);
  };

  const chargeUser = async () => {
    try {
      loading(true);
      const response = await API.payment.post({ card: payment, amount: 100 }, 'charge');
      setPaymentException(true);
      setPayment(response.data.data);
      resetPaymentReport();
      loading(false);
      if (response.data.data) requestSecurityPopup();
    } catch (error) {
      const { message } = error.response ? error.response.data : error;
      setToast({ message, type: 'error' });
      loading(false);
    }
  };

  const handleCheckout = async () => {
    const availablePayment = payment || (card && card.cards.find(({ slug }) => slug === card.defaultCard));
    const availableAddress = formAddress || (address && address.addresses.find(({ slug }) => slug === address.defaultAddress));

    if (availableAddress && availablePayment) {
      setToast({ message: null });
      const deliveryAddress = { ...availableAddress, user: user.slug, };

      const bukkaSlug = (business && business.slug);
      if (!payment) {
        const authCode = availablePayment.authorization_code;
        const order = { deliveryAddress, cart: { items: [...cart], user: user.slug }, day, bukkaSlug, time, deliveryMode: mode, authCode };
        // using saved payment information
        await API.order.post(order);
        finishTransaction();
      } else chargeUser();

      // then
      resetAddressReport();
      resetPaymentReport();
      return;
    }

    const fieldReport = (!availableAddress && 'address') || (!availablePayment && 'payment') || '';
    const message = `Please fill out the ${fieldReport} form`;
    setToast({ message, type: 'error' });
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
  deliveryModeReducer: { mode },
  deliveryScheduleReducer: { schedule: { day, time } },
}) => ({
  amount: totalCost,
  cart: items,
  day,
  time,
  mode,
});

const FINISH_CHARGE_TRANSACTION = 'FINISH_CHARGE_TRANSACTION';

const finishChargeTransactionAction = (status, data) => ({
  type: `${FINISH_CHARGE_TRANSACTION}_${status}`,
  data
});

const finishChargeTransaction = () => async (dispatch) => {
  dispatch(finishChargeTransactionAction('SUCCESS', null));
};

export default connect(
  mapStateToProps,
  {
    finishTransaction: finishChargeTransaction,
    checkoutUser: postUserOrder,
  }
)(CheckoutPage);

CheckoutPage.propTypes = {};
