import React from 'react';
import PropTypes from 'prop-types';
import './groupcontainer.scss';

const GroupContainer = ({ children, title }) => (
  <div data-cy="group-container" className="article-group-container">
    <div data-cy="group-title">
      <div className="article-group-title">
        <div className="article-group-title-text">{title}</div>
      </div>
      <div className="personalized-header-divider" />
    </div>
    <div>
      {children}
    </div>
  </div>
);

export const Message = ({ message }) => (
  <div
    data-cy="message"
    className="article-group-message"
  >
    {message}
  </div>
);

export const AccountCredit = () => (
  <div data-cy="account-credit" className="article-group-card-container">
    <div className="article-group-card-content">
      <div data-cy="account-credit-details" className="article-group-card-item">
        100% off delivery only for next 50 orders
      </div>
      <div data-cy="account-credit-issued" className="article-group-card-item">
        <span className="article-group-card-inline-item">Issued:</span>4/3/19, 5:56 PM {/* eslint-disable-line */}
      </div>
      <div data-cy="account-credit-expires" className="article-group-card-item">
        <span className="article-group-card-inline-item">
            Expires:
        </span> 5/1/19, 1:55 AM
      </div>
    </div>
    <div className="article-group-item-right">
      <div
        data-cy="account-credit-balance"
        className="article-group-card-item"
      >
      50
      </div>
      <div data-cy="account-credit-status" className="article-group-card-item">
        Available
      </div>
    </div>
  </div>
);

export const AccountCreditExpired = () => (
  <div>
    <div className="personalized-header-divider" />
    <div data-cy="account-credit" className="article-group-card-container">
      <div className="article-group-card-content">
        <div data-cy="account-credit-details" className="article-group-card-item">
        100% off delivery only for next 1 orders
        </div>
        <div
          data-cy="account-credit-issued"
          className="article-group-card-item"
        >
          <span className="article-group-card-inline-item">
          Issued:
          </span> 2/10/19, 10:30 AM
        </div>
      </div>
      <div className="article-group-item-right">
        <div
          data-cy="account-credit-status"
          className="article-group-card-item"
        >
            Expired
        </div>
      </div>
    </div>
  </div>
);

export default GroupContainer;

GroupContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};
