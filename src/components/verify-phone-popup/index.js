import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Field from '../input/Field';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import sendContactAction from '../../redux/sendContactAction';
import sendVerifationCodeAction from '../../redux/sendVerifationCodeAction';
import { useModalContext } from '../../context/ModalContext';

import './index.scss';

const phoneVerificationSupport = [
  { country: 'NG', key: '+234' }
];

const VerifyPhonePopup = ({ sendContact, sendVerifationCode }) => {
  const wrapperRef = React.createRef();
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
    value = _prefixInput(value, name);
    if (/^\d*\d*$/.test(value)) {
      const val = _inputFormater(value, name);
      setState({ [name]: _inputTrim(val, name) });
    }
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setModal(false);
      setVerificationPhonePopup(false);
    }
  };

  const handleClick = () => {
    setModal(false);
    setVerificationPhonePopup(false);
  };

  const resendCode = () => {
    if (state.contactMobile.length === 12) {
      const data = { contactMobile: state.contactMobile.split('-').join('') };
      sendContact(data).then((res) => {
        if (res.status === 200) setIsCodeVerification(true);
      });
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!isCodeVerification && state.contactMobile.length === 12) {
      const data = { contactMobile: state.contactMobile.split('-').join('') };
      sendContact(data).then((res) => {
        if (res.status === 200) setIsCodeVerification(true);
      });
    } else if (isCodeVerification && state.code.length === 11) {
      const data = { code: state.code.split(' ').join('') };
      sendVerifationCode(data).then((res) => {
        if (res.status === 200) handleClick();
      });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <Modal show={phoneVerificationPopup} bodyClassName="SmallWidth" ref={wrapperRef}>
      <DismissModal onClick={handleClick} withRightIcon />
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
                placeholderText={isCodeVerification ? '0-0-0-0-0-0' : '000-000-0000'}
                name={isCodeVerification ? 'code' : 'contactMobile'}
                classNames={`Verify-Phone-Input ${isCodeVerification ? 'Verify-Phone-Code' : ''}`}
              />
            </div>
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

export default connect(() => ({}), {
  sendContact: sendContactAction,
  sendVerifationCode: sendVerifationCodeAction
})(VerifyPhonePopup);
