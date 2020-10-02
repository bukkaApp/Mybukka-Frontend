import React, { useState } from 'react';
import Arrow from '../../assets/arrow.svg';
import Call from '../../assets/call.svg';
import './orderCard.scss';

export default function OrderCard({ data }) {
  const [showOrder, setShowOrder] = useState(true);
  return (
    <div className="card">
      <h2>Your order is almost ready</h2>
      <p className="motto"> We help your businesses like yours reach new</p>
      <div className="delivery-info mb-color">
        <div className="title-time">
          <span className="title">Estimated Delivery Time</span>
          <span className="title-title__time">{data.time}</span>
        </div>
        <progress value="33" className="order-progress" max="100"></progress>
        <span>Preparing your order...</span>
      </div>
      <div className="order-info">
        <div className="title">
          <p>Order detail </p>
          <span onClick={() => setShowOrder(!showOrder)}>
            <img
              src={Arrow}
              alt="arrow"
              style={{
                transform: showOrder ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />{' '}
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
                transform: showOrder ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </span>
        </div>
        <ul className="order-list">
          <li>
            <span>Tax </span> <span>#26000</span>
          </li>
        </ul>
      </div>
      <div className="profile">
        <div className="profile-details">
          <div className="circle">
            {/* <img alt="profile" className="circle" /> */}
          </div>
          <div className="details">
            <span className="name">Connie Watson</span>
            <span className="role"> Delivery Agent</span>
          </div>
        </div>
        <div className="call">
          <img src={Call} alt="call" />
          <span>call</span>
        </div>
      </div>
      <p className="text-danger">Continue shopping</p>
    </div>
  );
}
