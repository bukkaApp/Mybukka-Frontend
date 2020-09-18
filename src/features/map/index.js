import React, { useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { useMapContext } from '../../context/MapContext';

import './index.scss';

export default function Map() {
  const { isLoaded, hasMap, setMapVisibility } = useMapContext();

  useEffect(() => {
    setMapVisibility(true);
  }, [hasMap]);

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  return (
    <div className="container-fluid p-0">
      <GoogleMap center={center} zoom={10} mapContainerClassName="full-page">
        <div className="card">
          <h2>Your order is almost ready</h2>
          <p className="motto"> We help your businesses like yours reach new</p>
          <div className="delivery-info mb-color">
            <div className="title-time">
              <span className="title">Estimated Delivery Time</span>{' '}
              <span className="time">3:45pm</span>
            </div>
            <progress value="33" classname="progress" max="100"></progress>
            <span>Preparing your order...</span>
          </div>
          <div className="order-info">
            <div className="title">
              <p>Order detail </p>
              <span> V</span>
            </div>
            <ul className="order-list">
              <li>
                <span>Rice and stew</span> <span>#13000</span>
              </li>
              <li>
                <span>Rice and stew</span> <span>#13000</span>
              </li>
              <li className="mb-color">
                <span>Tax </span> <span>#26000</span>
              </li>
            </ul>
          </div>
          <div className="mb-color">
            <span>Total </span> <span>#26000</span>
          </div>
          <div className="mb-color">
            <div className="title">
              <p>Bukka Details</p>
              <span> V</span>
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
                <img alt="profile" className="circle" />
              </div>
              <div className="details">
                <span className="name">Connie Watson</span>
                <span className="role"> Delivery Agent</span>
              </div>
            </div>
            <div className="call">
              <span>call</span>
            </div>
          </div>
          <p className="text-danger">Continue shopping</p>
        </div>
      </GoogleMap>
    </div>
  );
}
