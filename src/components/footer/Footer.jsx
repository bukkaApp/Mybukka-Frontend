import React from 'react';
import UrlLists from '../list/UrlLists';

import './footer.scss';

const customUrlListsProps = {
  links: [
    { text: 'link 1', href: '/', key: '1' },
    { text: 'link 2', href: '/', key: '2' },
    { text: 'link 3', href: '/', key: '3' },
    { text: 'link 4', href: '/', key: '4' },
    { text: 'link 5', href: '/', key: '5' },
    { text: 'link 6', href: '/', key: '6' }
  ]
};

const Footer = () => (
  <div className="footer">
    <div className="container">
      <div className="row navs">
        <div className="col col-12 col-sm-12 col-md-6 col-lg-3 col-xl-2 footer-brand-section">
          <h4 className="footer-brand-name">Mybukka</h4>
        </div>
        <div className="col col-6 col-sm-6 col-md- 6 col-lg-3 col-xl-2 nav-section">
          <h4 className="nav-title">MYBUKKA</h4>
          <UrlLists
            links={customUrlListsProps.links}
            classNames="list-item-white"
          />
        </div>
        <div className="col col-6 col-sm-6 col-md- 6 col-lg-3 col-xl-2 nav-section">
          <h4 className="nav-title">CONTACT US</h4>
          <UrlLists
            links={customUrlListsProps.links}
            classNames="list-item-white"
          />
        </div>
        <div className="col col-6 col-sm-6 col-md- 6 col-lg-3 col-xl-2 nav-section">
          <h4 className="nav-title">SOCIAL MEDIA</h4>
          <UrlLists
            links={customUrlListsProps.links}
            classNames="list-item-white"
          />
        </div>
        <div className="col col-6 col-sm-6 col-md- 6 col-lg-3 col-xl-2 nav-section">
          <h4 className="nav-title">SOCIAL MEDIA</h4>
          <UrlLists
            links={customUrlListsProps.links}
            classNames="list-item-white"
          />
        </div>
        <div className="col col-6 col-sm-6 col-md- 6 col-lg-3 col-xl-2 nav-section">
          <h4 className="nav-title">SOCIAL MEDIA</h4>
          <UrlLists
            links={customUrlListsProps.links}
            classNames="list-item-white"
          />
        </div>
      </div>
      <div className="copyright-text text-center nav-section">
        <p>©2019 MYBUKKA INC TERMS PRIVACY</p>
      </div>
    </div>
  </div>
);

export default Footer;
