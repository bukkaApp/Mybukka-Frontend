import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import './header.scss';

const Header = () => (
  <section className="merchant-header">
    <div className="wrap">
      <div className="wrap-head">
        <h1>Partner With MyBukka</h1>
        <h2 className="header-sub-heading">Delivery and logistics, solved.</h2>
        <div className="">
          <a className="btn_text btn btn-lg" href="https://merchant.mybukka.com/signup">Sign Me Up</a>
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
