import React from 'react';
import './orderDescription.css';
import CustomButton from '../common/customButton'
import '../index.scss'
 
const OrderDescription = () => (
  <div className="order-info pb-5 sm-padding-buttom">
    <div className="container">
      <div className="row mx-0 flex-direction">
        <div className="col-md-6 mt-5 pl-3 custom-padding-left">
          <div className="order-bg"></div>
          <img
            src="https://res.cloudinary.com/mybukka/image/upload/v1586172515/Tablet_o9jxid.jpg"
            alt="order-image"
            className="order-img"
          />
        </div>

        <div className="col-md-6 mt-5 custom-padding-left">
          <h4>Orders your way.</h4>
          <p>
            The power is yours with the option to tell us how you’d like to
            receive orders. Whether it’s through the phone, tablet, or your POS
            system, with us, you have options.
          </p>
          <CustomButton buttonChildren="10,000 +" spanChildren="daily orders" />
        </div>
      </div>
    </div>
  </div>
);

export default OrderDescription; 