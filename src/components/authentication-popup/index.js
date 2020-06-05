import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/Modal';
import { useModalContext } from '../../context/ModalContext';
import DismissModal from '../modal/DismissModal';
import AuthenticateLogin from '../../features/authentication/LoginPage';

import AuthenticateRegister from
  '../../features/authentication/RegisterPage';
import './index.scss';

const AuthModal = ({ type }) => {
  const { push } = useHistory();
  const { authenticationPopup, setAuthenticationPopup, setModal } = useModalContext();
  let AuthForm = AuthenticateLogin;

  if (type === '/signup') {
    AuthForm = AuthenticateRegister;
  }

  const handleClick = () => {
    setModal(false);
    setAuthenticationPopup(false);
  };

  return (
    <Modal onClickOut={handleClick} show={authenticationPopup} bodyClassName="SmallWidth" classNames="auth-modal">
      <section className="Authentication-pop-wrapper">
        <DismissModal onClick={handleClick} classNames="close" />
        <AuthForm
          authModal
          history={{ push }}
          classNames="pt-5"
        />
      </section>
    </Modal>
  );
};

const mapStateToProps = ({
  changeAuthenticationPageReducer: { type }
}) => ({
  type
});

export default connect(mapStateToProps, null)(AuthModal);

AuthModal.defaultProps = {
  type: '/login',
};

AuthModal.propTypes = {
  type: PropTypes.string,
};
