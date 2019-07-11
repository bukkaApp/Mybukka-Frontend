/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { NavLink } from 'react-router-dom';

import './toolbar.scss';

const Toolbar = () => (
  <div id="component-toolbar" className="toggle-class">
    <div className="toolbar-container navbar navbar-expand-lg">
      <div className="openbtn">
        <div className="toolbar__logo ml-3">
          <NavLink to="/">
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/digitzs/image/upload/v1550480450/Bukka%20App/bukka-logo.svg"
              alt="Logo"
            />
          </NavLink>
        </div>
      </div>
      <div className="toolbar-links">
        <NavLink to="/merchant.mybukka.com/signin">
          <button type="button" className="pi-button with-shadow">
            LOGIN
          </button>
        </NavLink>
        <NavLink to="/merchant.mybukka.com/signup">
          <button type="button" className="pi-button with-shadow">
            REGISTER
          </button>
        </NavLink>
      </div>
    </div>
  </div>
);

export default Toolbar;
