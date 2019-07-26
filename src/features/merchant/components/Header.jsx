import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { Button } from 'react-bootstrap';

import './header.scss';

const Header = () => (
  <section className="header">
    <div className="wrap">
      <div className="wrap-head">
        <h1>Partner With MyBukka</h1>
        <h2 className="header-sub-heading">Delivery and logistics, solved.</h2>
        <div className="">
          <NavLink to="/merchant.mybukka.com/signup">
            <Button variant="info" size="lg" className="btn_text">
              Sign Me Up
            </Button>
          </NavLink>
        </div>
        <div className="scroll-down">
          <Link smooth to="#selling-points">
            <span className="chevron bottom" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Header;
