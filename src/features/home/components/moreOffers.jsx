/** @format */

import React from "react";
import "./moreOffers.scss";
import PropTypes from "prop-types";
import Button from "Components/button/Button";

const ActionButton = ({ handleClick }) => (
  <div className="action-button-section">
    <Button
      type="button"
      classNames="primary-button"
      handleClick={handleClick}
      text="get started"
    />
  </div>
);

const LargeTextSection = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img src="" alt="" />
      </div>
      <div className=" col-md-6">
        <h6>We deliver more than food</h6>
        <p>
          Get groceries fresh fruit and drinks delivered in under an hour so you
          can spend your time living your best life. Whether you need a gallon
          of milk or a handle of vodka, we get it.
        </p>
        <ActionButton handleClick={() => {}} />
      </div>
    </div>
  </div>
);

const MoreOffers = () => (
  <div className="more-offers-description">
    <LargeTextSection />
  </div>
);

export default MoreOffers;

ActionButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
