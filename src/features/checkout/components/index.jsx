import React, { useState } from 'react';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import Input from 'Components/input/InputField';
import InputData from './InputAttribute/inputData.json';
import './payment.scss';
import './deliveryAddress.scss';

const Delivery = () => {
  const [address, setAddress] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();

    e.target.setCustomValidity('Invalid field.');
    setAddress(true);
  };
  return (
    <div className="container mb-2 mt-4">
      <h1 className="font-size-36">Checkout</h1>
      <div className="col-md-6 p-0 mb-4 mt-4 height-50">
        <DeliveryOrPickupNav />
      </div>
      <h2 className="font-size-16">Delivery Address</h2>
      <form className="border padding-20 mt-4" action="">
        <div className="form-group font-size-14 mb-4">
          <label htmlFor="Address" className={address ? 'fly-over m-0' : 'no-label'}>Address</label>
          <Input
            type="text"
            placeholderText="Address"
            name="Address"
            handleChange={handleChange}
            classNames="form-control border-input-style p-0"
            id="address"
          />
          <span className="text-danger font-size-11">Required</span>
        </div>
        <div className="form-group font-size-14 mb-4">
          <label htmlFor="streetAddress2">Apt no or company name</label>
          <Input
            type="text"
            placeholderText="Apt no or company name"
            classNames="form-control border-input-style p-0"
            id="streetAddress2"
          />
          <span className="text-danger font-size-11">Required</span>
        </div>
        <div className="row font-size-14 mb-4">
          <div className="d-flex flex-column col-md-6">
            <label htmlFor="contactName">Contact Name</label>
            <Input
              type="text"
              classNames="form-control border-input-style p-0"
              placeholderText="Contact Name"
              id="contactName"
            />
            <span className="text-danger font-size-11">Required</span>
          </div>
          <div className="d-flex flex-column col-md-6">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input
              type="text"
              classNames="form-control border-input-style p-0"
              placeholderText="Phone Number"
              id="phoneNumber"
            />
            <span className="text-danger font-size-11">Required</span>
          </div>
        </div>
        <div className="form-group mb-4">
          <textarea
            placeholder="Add delivery instructions. (e.g. “Use the call box when you arrive)."
            name="instruction"
            className="form-control instruction"
          />
        </div>
        <div>
          <button type="submit" />
        </div>
      </form>

    </div>
  );
};

export default Delivery;
