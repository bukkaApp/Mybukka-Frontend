import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../modal/Modal';
import DismissModal from '../../modal/DismissModal';
import AuthenticateLogin from '../../../features/authentication/LoginPage';

import AuthenticateRegister from
  '../../../features/authentication/RegisterPage';

const AuthModal = ({ type, push, status }) => {
  const { authenticated } = status;
  let AuthForm = AuthenticateLogin;

  if (type === '/signup') {
    AuthForm = AuthenticateRegister;
  }

  const handleForgotPassword = () => {
    $('.close').click();
    push('/reset-password');
  };

  useEffect(() => {
    if (authenticated) {
      $('.close').click();
    }
  });

  return (
    <div className="container">
      <Modal classNames="auth-modal">
        <DismissModal classNames="close" />
        <AuthForm
          handleForgotPassword={handleForgotPassword}
          authModal
          history={{ push }}
          classNames="pt-5"
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  navbarAuthReducer: { type },
  authenticationReducer: { status }
}) => ({
  type,
  status
});

export default connect(mapStateToProps, null)(AuthModal);

AuthModal.defaultProps = {
  type: PropTypes.string,
};

AuthModal.propTypes = {
  type: PropTypes.string,
  push: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
};
