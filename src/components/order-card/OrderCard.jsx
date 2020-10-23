import React, { useState, useEffect } from 'react';
import Arrow from '../../assets/arrow.svg';
import Call from '../../assets/call.svg';
import './orderCard.scss';
import axios from '../../redux/axios/index';
import { useHistory } from 'react-router-dom';

export default function OrderCard({ data, clear, bukka }) {
  const [showOrder, setShowOrder] = useState(true);
  const [showBukka, setShowBukka] = useState(false);
  const history = useHistory();

  const handleContinue = () => {
    clear();
    history.push('/');
  };

  return (
    <div className="card">
      <h2>Your order is almost ready</h2>
      <p className="motto"> We help your businesses like yours reach new</p>
      <div className="delivery-info mb-color">
        <div className="title-time">
          <span className="title">Estimated Delivery Time</span>
          <span className="title-title__time">{data.time}</span>
        </div>
        <progress
          value={data.status === 'accepted' ? '33' : '70'}
          className="order-progress"
          max="100"
        ></progress>
        <span>Preparing your order...</span>
      </div>
      <div className="order-info">
        <div className="title">
          <p>Order detail </p>
          <span onClick={() => setShowOrder(!showOrder)}>
            <img
              src={Arrow}
              alt="arrow"
              className="cursor-pointer"
              style={{
                transform: showOrder ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </span>
        </div>
        <ul className="order-list">
          {showOrder &&
            data.cart.items.map((item) => {
              const {
                meal: { price, title },
              } = item;
              return (
                <li>
                  <span>{title}</span> <span>#{price}</span>
                </li>
              );
            })}
          <li className="mb-color mt-color">
            <span>Tax </span> <span>#{data.tax}</span>
          </li>
        </ul>
      </div>
      <div className="mb-color f-span">
        <span>Total </span> <span>#{data.total}</span>
      </div>
      <div className="mb-color">
        <div className="title">
          <p>Bukka Details</p>
          <span>
            <img
              src={Arrow}
              alt="arrow"
              style={{
                transform: showBukka ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              className="cursor-pointer"
              onClick={() => setShowBukka(!showBukka)}
            />
          </span>
        </div>
        <ul className={`bukka ${showBukka ? 'show-bukka' : 'show-bukka_none'}`}>
          <li>{bukka.name}</li>
          <li>{bukka.address}</li>
        </ul>
      </div>
      <div className="profile">
        {data.deliveryAgent && (
          <>
            <div className="profile-details">
              <div className="circle">
                {/* <img alt="profile" className="circle" /> */}
              </div>
              <div className="details">
                <span className="name">
                  {data.deliveryAgent.firstName +
                    ' ' +
                    data.deliveryAgent.lastName}
                </span>
                <span className="role"> Delivery Agent</span>
              </div>
            </div>
            <div
              onClick={() => {
                window.open('tel:' + data.deliveryAgent.contactMobile);
              }}
              className="call"
            >
              <img src={Call} alt="call" />
              <span>call</span>
            </div>
          </>
        )}
      </div>
      <p className="text-danger cursor-pointer" onClick={handleContinue}>
        Continue shopping
      </p>
    </div>
  );
}
