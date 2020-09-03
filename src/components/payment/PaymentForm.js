import React, { useState, useEffect } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

import Fields from '../input/Field';
import Button from '../button/Button';
import inputField from './payment.json';
import Form from '../form/Form';
import useApi from '../../shared/api';
import { validateAField, validateAllFields } from './validation';

import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import TemporaryWrapper from '../../components/ViewWrappers/TemporaryWrapper';
import { useFormReportContext } from '../../context/FormReportContext';
import { useModalContext } from '../../context/ModalContext';

const inpts = {
  number: '',
  expDate: '',
  cvv: '',
  zipCode: ''
};

const PaymentForm = ({ requestSecurityPopup, withPadding, label, withModal, handleClick, withFormSpace }) => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { setPayment, setUrl, url } = useUserContext();
  const wrapperRef = React.createRef();
  const { pathname } = useLocation();

  const matchCheckoutScreen = matchPath(pathname, {
    path: '/merchant/:slug/checkout',
    exact: true,
    strict: false
  });

  const { paymentFormPopup, setPaymentFormPopup, setModal } = useModalContext();
  // const { setAddressReport, requestAddressValidity, resetAddressReport, updateAddressData, changeAddress, address } = useFormReportContext();

  const { resetPaymentReport, updatePaymentData, changePayment, payment } = useFormReportContext();

  const [errorMessage, setErrorMessage] = useState(false);
  const [inlineLoading, setInlineLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(inpts);

  const [inputData, setInputData] = useState(inpts);

  /**
   * @method _formatInput
   * @param {*} name
   * @param {*} value
   * @abstract  { expData: 03/20, number 7777 7777 7777 7777 }
   * @return {string} string
   */
  const _formatInput = (name, value) => {
    if (name === 'expDate' && value.length) {
      return value.replace(/(\d{2})(\d{1})/, '$1/$2');
    } else if (name === 'number' && value.length) {
      return value.replace(/(\d{4})(\d{4})/, '$1 $2');
    }
    return value;
  };

  /**
   * @method _removeInputFormat
   * @param {*} fieldData
   * @param {*} name
   * @abstract  covert => { expDate: 03/20 }
   * to { expDate: 0320 } for proper validation
   * @example _removeInputFormat({ expDate: 03/20 }, expDate) => { expDate: 0320 }
   * @return {object} object
   */
  const _removeInputFormat = (fieldData, name) => {
    if (name === 'expDate' && fieldData[name].length) {
      return { [name]: fieldData[name].replace('/', '') };
    } else if (name === 'number' && fieldData[name].length) {
      return { [name]: fieldData[name].split(' ').join('') };
    }
    return fieldData;
  };


  /**
   * @method handleChange
   * @param {*} event
   * @abstract handle input field onChange event
   * @return {void} void
   */
  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: _formatInput(name, value) };
    const validation = validateAField(_removeInputFormat(newFieldData, name), name);
    setInputData({ ...inputData, ...newFieldData });
    setValidationErrors({ ...validationErrors, [name]: validation.message });
  };

  /**
   * @method _removeInputsFormatOnSubmit
   * @param {*} inps
   * @abstract  covert all inputData { expDate: 03/20, number 7777 7777 7777 7777 }
   * to { expDate: 0320, number 7777777777777777 } for proper validation
   * @return {object} object
   */
  const _removeInputsFormatOnSubmit = (inps) => {
    const newInputData = {};
    const inpFields = inps || inputData;
    Object.keys(inpFields).map((inp) => { // eslint-disable-line
      const completeField = { [inp]: inpFields[inp] };
      newInputData[inp] = _removeInputFormat(completeField, inp)[inp];
    });
    return newInputData;
  };


  useEffect(() => {
    if (changePayment) {
      setInputData({ ...inputData, ...payment });
      resetPaymentReport();
    }
  }, [changePayment, paymentFormPopup]);

  /**
   * @method _removeInputsFormatOnSubmit
   * @param {*} inputFields
   * @abstract seperate month and year before sending to server
   * @example { expDate: 01/20 } => { expiry_month: 01, expiry_year: 20 }
   * @return {object} object
   */
  const splitExpMonthAndYear = (inputFields) => {
    const expDateArr = inputData.expDate.split('/');
    return { ...inputFields, expiry_month: expDateArr[0], expiry_year: expDateArr[1] };
  };

  const onOkay = (e) => {
    e.preventDefault();
    let inputFields = _removeInputsFormatOnSubmit();
    const validation = validateAllFields(inputFields);
    inputFields = splitExpMonthAndYear(inputFields);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });

    if (passes) {
      updatePaymentData(inputData);
      if (!paymentFormPopup) return;
      setPaymentFormPopup(false);
      setModal(false);
    }
  };

  const onBlur = (event, data) => {
    if (!paymentFormPopup && matchCheckoutScreen) {
      if (event) {
        const { name, value } = event.target;
        const newFieldData = { [name]: _formatInput(name, value) };
        const validation = validateAField(_removeInputFormat(newFieldData, name), name);
        setValidationErrors({ ...validationErrors, [name]: validation.message });
      }

      let inputFields = _removeInputsFormatOnSubmit(data || inputData);
      const validation = validateAllFields(inputFields);
      inputFields = splitExpMonthAndYear(inputFields);

      const { passes, errors } = validation;

      if (!event) setValidationErrors({ ...validationErrors, ...errors, });

      if (passes) updatePaymentData(inputFields);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputFields = _removeInputsFormatOnSubmit();
    const validation = validateAllFields(inputFields);
    inputFields = splitExpMonthAndYear(inputFields);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });
    if (passes) {
      try {
        loading(true);
        setInlineLoading(true);
        const response = await API.payment.post({ card: inputFields, amount: 100 }, 'charge');
        setPayment(response.data.data);
        setUrl(response.data.data.url);
        console.log('url data', url);
        resetPaymentReport();
        setInlineLoading(false);
        loading(false);
        if (withModal) handleClick();
        if (response.data.data) requestSecurityPopup();
      } catch (error) {
        setErrorMessage(error.response.data.message || '');
        loading(false);
        setInlineLoading(false);
      }
    }
  };

  return (
    <div className={withPadding && 'mb-2 mt-4'}>
      {label && <TemporaryWrapper.ViewHeading noPadding text={label} />}
      <span className="text-danger font-size-11">{errorMessage}</span>
      <form id="payment" ref={wrapperRef} className={`border padding-20 ${withFormSpace ? 'mt-2' : 'mt-4'}`}>
        <div className="row flex- flex-nowrap-sm font-size-14">
          <Form
            inputData={inputData}
            inputField={inputField}
            handleChange={handleChange}
            onBlur={onBlur}
            errors={validationErrors}
          />
        </div>
        <div className="form-group Payment-Checkox-Wrapper">
          <Fields.Checkbox
            type="checkbox"
            classNames="checkbox"
            placeholder=""
            value=""
            checked
            name="makeDefaultPaymentOption"
            onChange={() => {}}
            onFocus={() => {}}
          />
          <span className="Payment-Checkox--text">Make default payment method</span>
        </div>
        <div className="Form-Button-Group">
          <Button
            type="button"
            classNames="small-button-save"
            handleClick={handleSubmit}
          >
            {inlineLoading ? <span className="spinner-border" role="status" /> : 'Save'}
          </Button>
          {(paymentFormPopup && matchCheckoutScreen) &&
          <Button
            type="button"
            classNames="small-button-save"
            handleClick={onOkay}
          >
            Okay
          </Button>}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

PaymentForm.propTypes = {};
