import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UrlLists from '../list/UrlLists';

import './footer.scss';

const customUrlListsProps = {
  links: [
    { text: 'link 1', href: '/', key: '1' },
    { text: 'link 2', href: '/', key: '2' },
    { text: 'link 3', href: '/', key: '3' },
    { text: 'link 4', href: '/', key: '4' },
    { text: 'link 5', href: '/', key: '5' },
    { text: 'link 6', href: '/', key: '6' },
  ],
  partners: [
    { text: 'Sell on MyBukka', href: '/merchant', key: '1' },
    { text: 'link 2', href: '/', key: '2' },
    { text: 'link 3', href: '/', key: '3' },
    { text: 'link 4', href: '/', key: '4' },
    { text: 'link 5', href: '/', key: '5' },
    { text: 'link 6', href: '/', key: '6' },
  ],
};

const Top = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);
  return (
    <div className="css-17o3a9q">
      <h3 className="css-bgwxxp">
        MyBukka is the largest, most reliable on-demand delivery and pickup
        platform.
      </h3>
      {!show ? (
        <p className="e15vi8s017">
          Able to deliver anything from anywhere, MyBukka is the food delivery,
          grocery delivery, whatever-you-can-think-of delivery app to bring what
          you crave right to your door.
          <span
            className="e15vi8s018"
            role="button"
            tabIndex="0"
            onClick={toggleShow}
          >
            <span> Read More</span>
          </span>
        </p>
      ) : (
        <p className="e15vi8s017">
          Able to deliver anything from anywhere, MyBukka is the food delivery,
          grocery delivery, whatever-you-can-think-of delivery app to bring what
          you crave right to your door. We’re the largest with more than 25,000+
          partner merchants, many of them exclusive, and we’re adding more every
          day. Every customer enjoys a curated and tailored experience,
          showcasing the very best of their area. Just enter your address, find
          something you like, and add it to your cart. Once you place your order
          we’ll forward your payment to the store and you can watch us zigzag
          through the city streets to bring your package to you.
          <span
            className="e15vi8s018"
            role="button"
            tabIndex="0"
            onClick={toggleShow}
          >
            <span> Read Less</span>
          </span>
        </p>
      )}
    </div>
  );
};

const Footer = () => (
  <div className="footer">
    <div className="container">
      <Top />
      <div className="row navs">
        <div className="footer-brand-section col-sm-12 col-md-12 col-lg-2">
          <h4 className="footer-brand-name">Mybukka</h4>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-10">
          <div className="custom-nav row">
            <div className="nav-section col">
              <h4 className="nav-title">MYBUKKA</h4>
              <UrlLists
                links={customUrlListsProps.links}
                classNames="list-item-white"
              />
            </div>
            <div className="nav-section col">
              <h4 className="nav-title">PARTNERS</h4>
              <UrlLists
                links={customUrlListsProps.partners}
                classNames="list-item-white"
              />
            </div>
            <div className="nav-section col">
              <h4 className="nav-title">FLEET</h4>
              <UrlLists
                links={customUrlListsProps.links}
                classNames="list-item-white"
              />
            </div>
            <div className="nav-section col">
              <h4 className="nav-title">FOLLOW US</h4>
              <UrlLists
                links={customUrlListsProps.links}
                classNames="list-item-white"
              />
            </div>
            <div className="nav-section col">
              <h4 className="nav-title">CITIES</h4>
              <UrlLists
                links={customUrlListsProps.links}
                classNames="list-item-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-text text-center">
        <p>©2019 MYBUKKA INC TERMS PRIVACY</p>
        <div className="text-center">
          <Link to="/legal/terms" className="px-2">Terms</Link>
          <Link to="/legal/privacy" className="px-2">Privacy</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
