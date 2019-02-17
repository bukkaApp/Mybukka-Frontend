import React from 'react';

import Modal from 'Components/modal';
import Container from 'Components/container/';
import DismissModal from 'Components/modal/DismissModal';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';

import './addPaymentForm.scss';

const CardFormHeader = () => (
  <div className="card-form-header">
    <AccountDetailsGroupHeader text="Add Payment Card" />
    <DismissModal classNames="add-card-close" />
  </div>
);

const AddPaymentForm = () => (
  <Modal classNames="add-card-form">
    <Container>
      <CardFormHeader />
    </Container>
  </Modal>
);

export default AddPaymentForm;
