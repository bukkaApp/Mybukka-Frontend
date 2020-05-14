import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../modal';
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

  if (authenticated) {
    // $('#authModal').modal('hide');
    const body = document.body;
    const backdrop = document.querySelector('.modal-backdrop');
    if (body.className === 'modal-open' && backdrop) {
      body.style.padding = 0;
      body.className = '';
      backdrop.remove();
    }
  }

  return (
    <div className="container">
      <Modal dataTarget="authModal" classNames="auth-modal">
        <DismissModal classNames="close" />
        <AuthForm
          authModal
          history={{ push }}
          classNames="pt-5"
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  changeAuthenticationPageReducer: { type },
  authenticationReducer: { status }
}) => ({
  type,
  status
});

export default connect(mapStateToProps, null)(AuthModal);

AuthModal.defaultProps = {
  type: '/login',
  status: {
    authenticated: false,
  }
};

AuthModal.propTypes = {
  type: PropTypes.string,
  push: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool),
};
