import React, { Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import changeAuthenticationPageAction from './actionCreators/changeAuthenticationPage';
import './navbar.scss';
import { useModalContext } from '../../context/ModalContext';

const PrimaryNavbar = ({ changeAuthenticationPage, authButton }) => {
  const { setAuthenticationPopup, setModal } = useModalContext();
  const isMobileScreen = useMediaQuery({ minWidth: 767 });
  const { push } = useHistory();
  const btnAtrributes = [{ type: 'button', text: 'sign in', classNames: 'small-outline-button bg-transparent', id: '/login' }, { type: 'button', text: 'sign up', classNames: 'small-button mr-0', id: '/signup' }];

  const emitOnClickOnMobile = ({ target: { id } }) => {
    // push to signin or signup pages on mobile
    push(id);
  };

  const emitOnClickOnDesktop = ({ target: { id } }) => {
    // toggle to signin or signup on destop using modal
    changeAuthenticationPage(id);
    setAuthenticationPopup(true);
    setModal(true);
  };

  return (
    <Fragment>
      <div className="">
        <nav className="container navbar navbar-light">
          <Brand />
          {authButton &&
          <div className="form-inline">
            {btnAtrributes.map(btnProp =>
              (<Button
                type={btnProp.type}
                text={btnProp.text}
                key={btnProp.text}
                classNames={btnProp.classNames}
                id={btnProp.id}
                handleClick={isMobileScreen ? emitOnClickOnDesktop : emitOnClickOnMobile}
              />))}
          </div>
          }
        </nav>
      </div>
    </Fragment>
  );
};

export default connect(
  null,
  {
    changeAuthenticationPage: changeAuthenticationPageAction
  }
)(PrimaryNavbar);

PrimaryNavbar.defaultProps = {
  authButton: false
};

PrimaryNavbar.propTypes = {
  authButton: PropTypes.bool,
  changeAuthenticationPage: PropTypes.func.isRequired
};
