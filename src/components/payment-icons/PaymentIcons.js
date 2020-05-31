import React from 'react';
import './PaymentIcon.scss';

const availableIcons = ['mastercard', 'visa', 'stripe', 'apple-pay', 'amex', 'amazon-pay'];

const color = {
  mastercard: 'danger',
  visa: 'primary'
};

const bgColor = {
  mastercard: 'mastercard',
};

const PaymentIcons = ({ type, classNames }) => (
  availableIcons.includes(type) ?
    <i className={`fab fa-cc-${type} text-${color[type] || 'primary'} ${bgColor[type] || ''} ${classNames || ''}`} />
    : <i className={`fas fa-credit-card text-primary bg-light ${classNames || ''}`} />
);

export default PaymentIcons;
