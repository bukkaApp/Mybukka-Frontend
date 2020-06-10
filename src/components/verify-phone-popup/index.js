import React, { useState } from 'react';
import Field from '../input/Field';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import useApi from '../../shared/api';
import { useModalContext } from '../../context/ModalContext';
import { useLoadingContext } from '../../context/LoadingContext';

import './index.scss';

const phoneVerificationSupport = [
  { country: 'NG', key: '+234' }
];

const VerifyPhonePopup = () => {
  const { API } = useApi();
  const [errorMessage, setErrorMessage] = useState('');
  const { loading } = useLoadingContext();
  const [isCodeVerification, setIsCodeVerification] = useState(false);
  const [state, setState] = useState({ contactMobile: '', code: '' });
  const { phoneVerificationPopup, setVerificationPhonePopup, setModal } = useModalContext();

  const _inputFormater = (value, name) => {
    if (name === 'contactMobile') {
      return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return value.replace(/(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})/, '$1 $2 $3 $4 $5 $6');
  };

  const _inputTrim = (value, name) => {
    if (name === 'contactMobile') {
      return value.slice(0, 12);
    }
    return value.slice(0, 11);
  };

  const _prefixInput = (value, name) => {
    if (name === 'contactMobile') {
      return value.split('-').join('');
    }
    return value.split(' ').join('');
  };

  const handleChange = ({ target: { value, name } }) => {
    if (errorMessage) setErrorMessage('');
    value = _prefixInput(value, name);
    if (/^\d*\d*$/.test(value)) {
      const val = _inputFormater(value, name);
      setState({ [name]: _inputTrim(val, name) });
    }
  };

  const handleClick = () => {
    if (!isCodeVerification) {
      setModal(false);
      setVerificationPhonePopup(false);
    }
  };

  const tryCatch = async (apiCall, data, id, enterCode) => {
    setErrorMessage('');
    try {
      loading(true);
      await apiCall(data, id);
      loading(false);
      if (enterCode) setIsCodeVerification(true);
      else handleClick();
    } catch (error) {
      loading(false);
      const replaceErr = 'Your number has already been verified';
      const throwErr = err => (err.message === replaceErr ? 'phone number already in use' : err.message);
      setErrorMessage(error.response ? throwErr(error.response.data) : error.message);
    }
  };

  const resendCode = () => {
    if (state.contactMobile.length === 12) {
      const data = { contactMobile: state.contactMobile.split('-').join('') };
      tryCatch(API.verify.post, data, 'send-code', true);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!isCodeVerification && state.contactMobile.length === 12) {
      const data = { contactMobile: state.contactMobile.split('-').join('') };
      tryCatch(API.verify.post, data, 'send-code', true);
    } else if (isCodeVerification && state.code.length === 11) {
      const data = { code: state.code.split(' ').join('') };
      tryCatch(API.verify.post, data, 'verify-phone');
    }
  };

  return (
    <Modal show={phoneVerificationPopup} bodyClassName="SmallWidth" onClickOut={handleClick}>
      <DismissModal
        onClick={handleClick}
        onClickBack={() => setIsCodeVerification(false)}
        withLeftIconOnly={isCodeVerification}
      />
      <div className={`Verify-Phone-Popup ${isCodeVerification ? 'Verify-Phone-Spacing' : ''}`}>
        <div className={`Verify-Phone-Popup-Head ${isCodeVerification ? 'Verify-Phone-NoSpacing' : ''}`}>
          <div className="Verify-Phone-Popup-Header">
            <span>{isCodeVerification ? 'Enter your code' : 'Add your phone number'}</span>
          </div>
        </div>
        <div className={`Verify-Phone-Popup-Head ${isCodeVerification ? 'Verify-Phone-NoSpacing' : ''}`}>
          <form data-auth-state="SIGN_UP_PHONE" className="Verify-Phone-Form">
            <div className="Verify-Phone-Title">
              <span>{isCodeVerification ? `We sent a code to ${state.contactMobile}, please enter it below.`
                : 'Your phone number is used for updates when your order is out for delivery.'}</span>
            </div>
            <div className={`Verify-Phone-Body ${isCodeVerification ? 'Verify-Phone-Body-Space' : ''}`}>
              {!isCodeVerification &&
                <div className="Verify-Phone-Select">
                  <div>
                    <div className="Verify-Phone-Select--active">
                      +234<svg width="10" height="5" className="Verify-Phone-Select-Icon">
                        <path fill="#b4b8c1" fillRule="evenodd" d="M0 0h10L5 5z" />
                      </svg>
                    </div>
                  </div>
                  {phoneVerificationSupport.length > 1 &&
                  <div className="Verify-Phone-Select-Dropdown">
                    <div className="Verify-Phone-Select-Dropdown-Content">
                      {phoneVerificationSupport.map(phoneVerification => (
                        <div className="Verify-Phone-Select-Item">
                          <div className="Verify-Phone-Select-Item-Num">{phoneVerification.key}</div>
                          <div className="Verify-Phone-Select-Item-Text">{phoneVerification.country}</div>
                        </div>
                      ))}
                    </div>
                  </div>}
                </div>}
              <Field.Input
                value={isCodeVerification ? state.code : state.contactMobile}
                handleChange={handleChange}
                type="text"
                placeholderText={isCodeVerification ? '0 0 0 0 0 0' : '000-000-0000'}
                name={isCodeVerification ? 'code' : 'contactMobile'}
                classNames={`Verify-Phone-Input ${isCodeVerification ? 'Verify-Phone-Code' : ''}`}
              />
            </div>
            <small className="Verify-Phone-Error-Message">{errorMessage}</small>
            <button onClick={handlePhoneSubmit} type="submit" className="Verify-Phone-Button">
              <span>{isCodeVerification ? 'Verify' : 'Submit'}</span>
            </button>
          </form>
          {isCodeVerification && <div tabIndex="0" aria-pressed="false" role="button" onClick={resendCode} className="Verify-Phone-Footer">re-send code</div>}
        </div>
      </div>
    </Modal>
  );
};

export default VerifyPhonePopup;
