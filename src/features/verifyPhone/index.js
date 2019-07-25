import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'Components/modal/Modal';
import DismissModal from 'Components/modal/DismissModal';

import sendContactAction from './actionCreators/sendContactAction';
// eslint-disable-next-line max-len
import sendVerifationCodeAction from './actionCreators/sendVerifationCodeAction';
import getUserAction from './actionCreators/getUserDataAction';
import AuthForm from './components/AuthForm';
import CodeForm from './components/CodeForm';
import { validateAField, validateAllFields } from './helper/validateFields';

import './index.scss';

const Index = ({
  user,
  status,
  handleGetUser,
  handleSendContact,
  handleVerifyCode,
}) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isContactSent, setIsContactSent] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    contactMobile: '',
    code: '',
  });

  const [inputData, setInputData] = useState({
    contactMobile: '',
    code: '',
  });

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
      handleSendContact({ contactMobile: inputData.contactMobile }, () =>
        setIsContactSent(true),
      );
    }
  };

  const submitCode = () => {
    const validation = validateAllFields({ code: inputData.code });

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      return handleVerifyCode({ code: inputData.code }, () =>
        setIsCodeSent(true),
      );
    }
  };

  useEffect(() => {
    // fix bootstrap padding error on body
    document.body.style.padding = 0;

    if (status.authenticated) {
      handleGetUser();
      $('#verifymodal').modal('show');
    }
  }, []);

  useEffect(() => {
    if (status.authenticated) {
      if (!user.verified) {
        document.getElementById('verifymodal').style.display = 'block !important';

        // $('#verifymodal').modal('show');
        // const body = document.body;
        // const backdrop = document.querySelector('.modal-backdrop');
        // if (body.className.includes('modal-open') && backdrop) {
        //   body.style.padding = 0;
        //   body.className = '';
        //   backdrop.remove();
        // }
      } else {
        // document.body.padding = 0;
        // document.body.className = '';
        document.getElementById('verifymodal').style.display = 'none !important';
      }
    }
  });

  return (
    <div className="container">
      <Modal dataTarget="verifymodal" id="verifymodal" classNames="auth-modal">
        <DismissModal classNames="close" />
        <div className="verify-phone">
          {!isContactSent && (
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              errors={validationErrors}
            />
          )}
          {isContactSent && !isCodeSent ? (
            <CodeForm
              handleChange={handleChange}
              handleSubmit={submitCode}
              errors={validationErrors}
              inputData={inputData}
            />
          ) : null}
          {isCodeSent && (
            <div className="sub-text">
              <div className="p">Congratulation!</div>
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
}) => ({
  status,
  user,
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
};

Index.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool),
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  ),
  handleSendContact: PropTypes.func.isRequired,
  handleVerifyCode: PropTypes.func.isRequired,
  handleGetUser: PropTypes.func.isRequired,
};
