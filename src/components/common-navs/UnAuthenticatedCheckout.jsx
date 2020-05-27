import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Button from '../button/Button';
import setCheckoutMode from './actionCreators/setCheckoutMode';

import './unaunthenticated-checkout.scss';
import { useUserContext } from '../../context/UserContext';

const UnAuthenticatedCheckout = ({
  push,
  mode,
  to,
  handleCheckoutMode,
}) => {
  const { isAuthenticated } = useUserContext();
  const handleClick = (e) => {
    e.preventDefault();
    handleCheckoutMode(false);
    push(to);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleCheckoutMode(false);
  };

  return (
    (!isAuthenticated && mode) &&
    <div className="modal-root">
      <div className="unaunthenticated-backdrop">
        <div className="unaunthenticated-container">
          <div className="unaunthenticated-content">
            <h2 className="unaunthenticated-heading">
              <span>Order will require verification</span>
            </h2>
            <p className="unaunthenticated-main-content">
              <span>To receive your order,
                {'you’ll'} need to show a valid photo ID showing
                that you’re at least 21 years old.
              </span>
            </p>
          </div>
          <div direction="row" className="unaunthenticated-footer">
            <Button
              color="#00CC99"
              type="button"
              handleClick={handleClick}
              classNames="unaunthenticated-continuation"
            >
              <span>Checkout</span>
            </Button>
            <Button
              color="#8F95A3"
              handleClick={handleCancel}
              classNames="unaunthenticated-cancel"
              type="button"
            >
              <span>Cancel</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  checkoutModeReducer: { mode }
}) => ({
  mode
});

export default connect(mapStateToProps,
  { handleCheckoutMode: setCheckoutMode })(UnAuthenticatedCheckout);

UnAuthenticatedCheckout.propTypes = {
  push: PropTypes.func.isRequired
};
