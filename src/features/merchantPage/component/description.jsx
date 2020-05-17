import React from 'react';
import './description.css';
import '../index.scss'



const Description = () => (
  <div className="py-5">
    <div className="description container">
      <h4> Why Bukka ?</h4>
      <p>
        We help businesses like yours reach new customers in your neighborhoods
        and grow to become local favorites.
      </p>
      <div className="bar"></div>
    </div>

    <div className="top-3 px-3 mb-4">
      <div className="row mx-0">
        <div className="col-md-6 col-lg-3 text-align-center description-info pt-2">
          <i className="far fa-snowflake custom-icon"></i>
          <h4>Seamless Connections</h4>
          <p>
            We help businesses like yours reach new customers in your
            neighborhoods and grow to become local favorites.
          </p>
        </div>

        <div className="col-md-6 col-lg-3 text-align-center description-info pt-2 sm-padding">
          <i className="fas fa-laptop custom-icon"></i>
          <h4>Digital Presence</h4>
          <p>
            We help businesses like yours reach new customers in your
            neighborhoods and grow to become local favorites.
          </p>
        </div>

        <div className="col-md-6 col-lg-3 text-align-center description-info pt-2 sm-padding md-padding">
          <i className="fas fa-shopping-cart custom-icon"></i>
          <h4>Increasing Orders</h4>
          <p>
            We help businesses like yours reach new customers in your
            neighborhoods and grow to become local favorites.
          </p>
        </div>

        <div className="col-md-6 col-lg-3 text-align-center description-info pt-2 sm-padding md-padding">
          <i className="fas fa-question custom-icon"></i>
          <h4>Online help</h4>
          <p>
            We help businesses like yours reach new customers in your
            neighborhoods and grow to become local favorites.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Description;