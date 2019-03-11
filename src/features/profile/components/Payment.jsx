import React from 'react';

import { BasicPlus } from 'Icons/Plus';

import AddMoreSection from '../common/AddMoreSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import AddPaymentForm from '../forms/AddPaymentForm';

import './payment.scss';

const AddPayment = () => (
  <div className="add-payment">
    <AddMoreSection text="Add payment card" dataTarget="#modal">
      <BasicPlus />
    </AddMoreSection>
  </div>
);

const Payment = () => (
  <div className="payment-details-section">
    <AddPaymentForm type="payment" />
    <AccountDetailsGroupHeader text="payment" />
    <AddPayment />
  </div>
);

export default Payment;
