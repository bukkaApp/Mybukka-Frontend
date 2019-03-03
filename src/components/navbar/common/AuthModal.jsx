import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../modal/Modal';
import DismissModal from '../../modal/DismissModal';
import AuthenticateLogin from '../../../features/authentication/LoginPage';
import AuthenticateRegister from '../../../features/authentication/RegisterPage';
import './authmodal.scss';

const AuthModal = ({ type, push, status }) => {
  const { authenticated } = status;
  let AuthForm = AuthenticateLogin;
  if (type === '/signup') {
    AuthForm = AuthenticateRegister;
  }
  const AuthenticatedAuthForm = () => {
    if (authenticated) {
      document.body.classList.remove('modal-open');
      document.body.style.padding = 0;
      return null;
    }
    return (
      <div className="container">
        <Modal classNames="auth-modal">
          <DismissModal classNames="close mr-5" />
          <AuthForm authModal history={{ push }} classNames="pt-5" />
        </Modal>
      </div>
    );
  }
  return (
    <AuthenticatedAuthForm />
  );
};

const mapStateToProps = ({
  homeReducer: { type },
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
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
