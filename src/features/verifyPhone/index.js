import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from './components/Modal';
import sendContactAction from './actionCreators/sendContactAction';
// eslint-disable-next-line max-len
import sendVerifationCodeAction from './actionCreators/sendVerifationCodeAction';
import getUserAction from './actionCreators/getUserDataAction';
import AuthForm from './components/AuthForm';
import CodeForm from './components/CodeForm';
import { validateAField, validateAllFields } from './helper/validateFields';
import inputInterface from './common/inputInterface.json';

import './index.scss';

const Index = ({
  user,
  status,
  handleGetUser,
  handleSendContact,
  handleVerifyCode,
  sendContactError,
  verifyCodeError,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isContactSent, setIsContactSent] = useState(false);
  const [inputData, setInputData] = useState(inputInterface);
  const [validationErrors, setValidationErrors] = useState(inputInterface);
  const [requestSent, setRequestSent] = useState({ phone: false, code: false });

  const stopCodeSpinner = () => setRequestSent({ code: false, phone: false });
  const stopPhoneSpinner = () => setRequestSent({ phone: false, code: false });

  const validateOnClick = (newValidationError) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationError,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({
      ...inputData,
      ...newFieldData,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message,
    });
  };

  const handleSubmit = () => {
    const validation = validateAllFields(
      { contactMobile: inputData.contactMobile },
      true,
    );

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      setRequestSent({
        phone: true,
        code: false,
      });
      handleSendContact({ contactMobile: inputData.contactMobile }, () => {
        setIsContactSent(true);
      });
    }
  };

  const submitCode = () => {
    const validation = validateAllFields({ code: inputData.code });

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      setRequestSent({
        phone: false,
        code: true,
      });
      handleVerifyCode({ code: inputData.code }, () => {
        setIsCodeSent(true);
      });
    }
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (status.authenticated) {
      handleGetUser();
    }
  }, []);

  useEffect(() => {
    if (status.authenticated) {
      if (user.verified) {
        setModalOpen(false);
      } else {
        setModalOpen(true);
      }
    }
  }, [user]);

  return (
    <div className="container">
      <Modal open={modalOpen} handleClose={closeModal}>
        <div className="verify-phone">
          {!isContactSent && (
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              sent={requestSent.phone}
              errors={validationErrors}
              errorMessage={sendContactError}
              stopPhoneSpinner={stopPhoneSpinner}
            />
          )}
          {isContactSent && !isCodeSent ? (
            <CodeForm
              handleChange={handleChange}
              handleSubmit={submitCode}
              sent={requestSent.code}
              errors={validationErrors}
              inputData={inputData}
              errorMessage={verifyCodeError}
              handleSendContact={handleSendContact}
              stopCodeSpinner={stopCodeSpinner}
            />
          ) : null}
          {isCodeSent && (
            <div className="sub-text">
              <div className="p text-success size-22-px">Congratulation!</div>
              <div className="p">
                Your number has been verified successfully
              </div>
              <div className="p bold">
                please check your mail for a discount coupon
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  authenticationReducer: { status },
  getUserDataReducer: { user },
  sendContactReducer: { errorMessage: sendContactError },
  sendVerificationCodeReducer: { errorMessage: verifyCodeError },
}) => ({
  status,
  user,
  sendContactError,
  verifyCodeError,
});

export default connect(
  mapStateToProps,
  {
    handleSendContact: sendContactAction,
    handleVerifyCode: sendVerifationCodeAction,
    handleGetUser: getUserAction,
  },
)(Index);

Index.defaultProps = {
  status: {
    authenticated: false,
  },
  user: {},
  sendContactError: '',
  verifyCodeError: '',
};

Index.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool),
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  ),
  handleSendContact: PropTypes.func.isRequired,
  handleVerifyCode: PropTypes.func.isRequired,
  handleGetUser: PropTypes.func.isRequired,
  sendContactError: PropTypes.string,
  verifyCodeError: PropTypes.string,
};
