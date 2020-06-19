import React from 'react';

import { useFormReportContext } from '../../context/FormReportContext';
import { useModalContext } from '../../context/ModalContext';
import PlainParagraph from '../plain-paragraph/PlainParagraph';
import PaymentIcons from '../payment-icons/PaymentIcons';

import './index.scss';

const CurrentPayment = ({ useProfileStandard }) => {
  const { setPaymentFormPopup, setModal, } = useModalContext();
  const { changePayment, payment, resetPaymentReport } = useFormReportContext();

  const decodeBankCard = () => {
    if (payment && payment.number) {
      const asteriks = '****************';
      return `${asteriks}${payment.number.slice(-3)}`;
    }
    return '';
  };

  const emitOnClick = (state) => {
    setModal(state);
    setPaymentFormPopup(state);
  };

  return changePayment ?
    <PlainParagraph
      noBorderOnMedium={!useProfileStandard}
      onClick={() => emitOnClick(true)}
      title="Double click to remove"
      onDoubleClick={() => resetPaymentReport()}
      withPrimaryButton
      buttonText="Current"
      aligned="baseline"
    >
      {/* <PaymentIcons type={type.split(' ')[0]} classNames="fa-2x" /> */}
      <p className="Payment-Bank-Card">{decodeBankCard()}</p>
      <PaymentIcons type={'default'} />
    </PlainParagraph>
    : null;
};

export default CurrentPayment;

CurrentPayment.defaultProps = {};

CurrentPayment.propTypes = {};
