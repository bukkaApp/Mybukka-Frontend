import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../modal/Modal';
import { useModalContext } from '../../context/UseModal';
import DismissModal from '../modal/DismissModal';
import AuthenticateLogin from '../../features/authentication/LoginPage';

import AuthenticateRegister from
  '../../features/authentication/RegisterPage';
import './index.scss';

const AuthModal = ({ type, push }) => {
  const { authenticationPopup, setAuthenticationPopup, setModal } = useModalContext();
  const wrapperRef = React.createRef();
  let AuthForm = AuthenticateLogin;

  if (type === '/signup') {
    AuthForm = AuthenticateRegister;
  }

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setModal(false);
      setAuthenticationPopup(false);
    }
  };

  const handleClick = () => {
    setModal(false);
    setAuthenticationPopup(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <Modal show={authenticationPopup} bodyClassName="SmallWidth" ref={wrapperRef} dataTarget="authModal" classNames="auth-modal">
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
};
