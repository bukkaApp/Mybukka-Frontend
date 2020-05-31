import React from 'react';

import { useHistory } from 'react-router-dom';
import { BasicPlus } from 'Icons/Plus';

import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import useApi from '../../shared/api';
import { useLoadingContext } from '../../context/LoadingContext';
import PlainParagraph from '../plain-paragraph/PlainParagraph';
import TemporaryWrapper from '../ViewWrappers/TemporaryWrapper';
import ButtonPill from '../button-pill/ButtonPill';
import PaymentIcons from '../payment-icons/PaymentIcons';
import Payment from './Payment';

import './index.scss';

const AddAnAddress = () => {
  const { setPaymentPopup, setModal } = useModalContext();

  const handleClick = () => {
    setModal(true);
    setPaymentPopup(true);
  };

  return (
    <div className="add-payment">
      <ButtonPill onClick={handleClick} text="Add payment card">
        <BasicPlus />
      </ButtonPill>
    </div>
  );
};

const Payments = ({ useProfileStandard, noPadding }) => {
  const { card: cards, setCard } = useUserContext();
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { push } = useHistory();

  const changePaymentCard = () => push('/profile#payments');

  const deletePaymentCard = async (id) => {
    const result = confirm('Want to delete?');
    if (!result) return;
    try {
      loading('PAYMENT', true);
      const response = await API.card.delete(id);
      setCard(response.data.cards);
      loading('PAYMENT', false);
    } catch (error) {
      setCard(error.response ? null : cards);
      loading('PAYMENT', false);
    }
  };

  const decodeBankCard = (bank) => {
    // eg guaranty trust bank => [guaranty, trust, bank] => slice [guaranty, trust]
    const splittedBankName = bank.split(' ').slice(0, -1);
    if (splittedBankName.length > 1) {
      return `${splittedBankName.map(bnk => bnk.slice(0, 1).toUpperCase()).join('')} Card`;
    }
    return `${splittedBankName.join('')} Card`;
  };

  const decodeButtonText = (slug) => {
    if (!useProfileStandard) return 'Change';
    return (cards.defaultCard !== slug ? 'DELETE' : 'DEFAULT');
  };

  const emitOnClick = (slug) => {
    if (cards.defaultCard !== slug) return deletePaymentCard(slug);
    return changePaymentCard();
  };

  const isntDefaultAddress = slug => cards.defaultCard !== slug;

  const paymentJsx = (cards && cards.cards.map(({ bank, slug, card_type: type }) => (
    !useProfileStandard && isntDefaultAddress(slug) ? null
      : <PlainParagraph
        onClick={() => emitOnClick(slug)}
        withPrimaryButton={cards.defaultCard === slug}
        buttonText={decodeButtonText(slug)}
        aligned="baseline"
        key={`Plain-Account-Details-DELETE--${slug}`}
      >
        <PaymentIcons type={type.split(' ')[0]} classNames="fa-2x" />
        <p className="Payment-Bank-Card">{decodeBankCard(bank)}</p>
        <PaymentIcons type={'default'} />
      </PlainParagraph>
  )));

  if (useProfileStandard) {
    return (
      <div id="payments" className={(useProfileStandard && 'Payment-Section') || ''}>
        <div className="account-details-header">
          <h5 className="account-details-text">Payment</h5>
        </div>
        {paymentJsx}
        <AddAnAddress />
      </div>
    );
  }

  return (
    <TemporaryWrapper.ViewWrapper>
      {(!cards || !cards.cards.length) ?
        <Payment withFormSpace withPadding label="Delivery Address" /> :
        <div className={`${noPadding ? '' : 'addresses-section'}`}>
          <TemporaryWrapper.ViewHeading noPadding text="Payments" />
          {paymentJsx}
        </div>
      }
    </TemporaryWrapper.ViewWrapper>);
};

export default Payments;

Payments.defaultProps = {};

Payments.propTypes = {};
