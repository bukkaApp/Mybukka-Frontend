import React from 'react';

import PropTypes from 'prop-types';
import Modal from 'Components/modal';
import Container from 'Components/container/';
import DismissModal from 'Components/modal/DismissModal';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import AddressSection from './AddressSection';
// import PaymentSection from './PaymentSection';

import './addPaymentForm.scss';

const CardFormHeader = () => (
  <div className="card-form-header">
    <AccountDetailsGroupHeader text="Add Payment Card" />
    <DismissModal classNames="add-card-close" />
  </div>
);

const AddPaymentForm = props => (
  <Modal classNames="add-card-form">
    <Container>
      <CardFormHeader />
      <AddressSection {...props} />
    </Container>
  </Modal>
);

export default AddPaymentForm;

AddPaymentForm.defaultProps = {
  type: 'address'
};

AddPaymentForm.propTypes = {
  type: PropTypes.string
};
