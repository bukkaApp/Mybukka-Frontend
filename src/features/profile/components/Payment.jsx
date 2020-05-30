import React from 'react';

import { BasicPlus } from 'Icons/Plus';

import PlainAccountDetails from '../common/PlainAccountDetails';
import AddMoreSection from '../common/AddMoreSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import { useModalContext } from '../../../context/ModalContext';
import { useUserContext } from '../../../context/UserContext';
import useApi from '../../../shared/api';
import { useLoadingContext } from '../../../context/LoadingContext';

import './payment.scss';

const AddPayment = () => {
  const { setPaymentPopup, setModal } = useModalContext();

  const handleClick = () => {
    setModal(true);
    setPaymentPopup(true);
  };

  return (
    <div className="add-payment">
      <AddMoreSection text="Add payment card" onClick={handleClick}>
        <BasicPlus />
      </AddMoreSection>
    </div>
  );
};

const Payment = () => {
  const { card, setCard } = useUserContext();
  const { API } = useApi();
  const { loading } = useLoadingContext();

  const deletePaymentCard = async (id) => {
    const result = confirm('Want to delete?');
    if (result) {
      try {
        loading('PAYMENT', true);
        await API.card.delete(id);
        const response = await API.card.get();
        setCard(response.data.card || null);
        loading('PAYMENT', false);
      } catch (error) {
        setCard(error.response ? null : card);
        loading('PAYMENT', false);
      }
    }
  };

  return (
    <div className="payment-details-section">
      <AccountDetailsGroupHeader text="Payment" />
      {card && card.cards.map(eachCard => (
        <PlainAccountDetails
          handleEdit={() => deletePaymentCard(eachCard._id)}
          btnText="DELETE"
          text={eachCard.card_type}
          key={`Plain-Account-Details-DELETE-$${card._id}`}
        />
      ))}
      <AddPayment />
    </div>
  );
};

export default Payment;
