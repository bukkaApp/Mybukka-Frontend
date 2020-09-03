import React from 'react';

// https://codepen.io/jantm/pen/uIzDL

const PaymentCard = () => (
  <div className="card">
    <div className="bank-name" title="BestBank">BestBank</div>
    <div className="chip">
      <div className="side left" />
      <div className="side right" />
      <div className="vertical top" />
      <div className="vertical bottom" />
    </div>
    <div className="data">
      <div className="pan" title="4123 4567 8910 1112">4123 4567 8910 1112</div>
      <div className="first-digits">4123</div>
      <div className="exp-date-wrapper">
        <div className="left-label">EXPIRES END</div>
        <div className="exp-date">
          <div className="upper-labels">MONTH/YEAR</div>
          <div className="date" title="01/17">01/17</div>
        </div>
      </div>
      <div className="name-on-card" title="John Doe">John Doe</div>
    </div>
    <div className="lines-down" />
    <div className="lines-up" />
  </div>
);

export default PaymentCard;
