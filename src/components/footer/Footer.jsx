import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UrlLists from '../list/UrlLists';
import Brand from '../brand/Brand';

import './footer.scss';
import useHistory from '../../hooks/useHistory';

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
  ],
  supports: [
    { text: 'Customer Help', href: '/', key: '1' },
    { text: 'Merchant Help', href: '/', key: '2' },
  ],
  follow: [
    { text: 'Twitter', href: '/', key: '1' },
    { text: 'Facebook', href: '/', key: '2' },
    { text: 'Instagram', href: '/', key: '3' },
    { text: 'Linkedin', href: '/', key: '4' },
  ],
};

const Top = () => (
  <div className="css-17o3a9q">
    <h3 className="css-bgwxxp">
      The largest, most reliable on-demand delivery and pickup
      platform.
      </h3>
    <p className="e15vi8s017">
      Able to deliver anything from anywhere, MyBukka is the food delivery,
      grocery delivery, whatever-you-can-think-of delivery app to bring what
      you crave right to your door.
        </p>
  </div>
);

const Footer = () => {
  const { push } = useHistory();

  const onClick = (e, url) => {
    e.preventDefault();
    push(url);
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="navs">
          <div className="footer-brand-section">
            <Brand />
            <Top />
          </div>
            <div className="custom-nav row">
              <div className="nav-section col">
                <h4 className="nav-title">BUKKA</h4>
                <UrlLists
                  links={customUrlListsProps.links}
                  classNames="list-item-white"
                />
              </div>
              <div className="nav-section col">
                <h4 className="nav-title">BUSINESS</h4>
                <UrlLists
                  links={customUrlListsProps.partners}
                  classNames="list-item-white"
                />

                <h4 className="nav-title">SUPPORTS</h4>
                <UrlLists
                  links={customUrlListsProps.supports}
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
              <div className="nav-section col">
                <h4 className="nav-title">FOLLOW US</h4>
                <UrlLists
                  links={customUrlListsProps.follow}
                  classNames="list-item-white"
                />
              </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="copyright-text">
          <p>©2019 MYBUKKA INC TERMS PRIVACY</p>
          
          <div className="float-right">
            <Link onClick={e => onClick(e, '/legal/terms')} to="/legal/terms" className="px-2">Terms & policy</Link>
            <Link onClick={e => onClick(e, '/legal/privacy')} to="/legal/privacy" className="">Privacy</Link>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Footer;
