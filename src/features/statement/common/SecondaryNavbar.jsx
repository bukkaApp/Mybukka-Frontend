import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronVertical from 'Icons/ChevronVertical';

import { UnOrderList, ListItem } from '../common/List';
import Navlink from '../../../components/navlink/Navlink';

const navArr = [
  { text: 'Terms of Service', href: '/legal/terms' },
  { text: 'Gift Cards', href: '/legal/gift' },
  { text: 'Privacy Policy', href: '/legal/privacy' },
  { text: 'Shipping Policy', href: '/legal/policy' }
];

const SmallScreen = ({ activePage }) => {
  const [active, setActive] = useState(false);
  return (
    <nav className="d-flex flex-column justify-content-between">
      <div
        role="button"
        tabIndex="0"
        onClick={() => setActive(!active)}
        className="secondary-custom-navbar-brand"
      >
        <span className="custom-mark">Legal</span>
        <ChevronVertical />
      </div>
      {active &&
      <UnOrderList
        classNames="secondary-custom-navbar-content p-0"
      >
        {navArr.map(navText => (
          <Navlink
            key={navText.text}
            href={navText.href}
            classNames={`${activePage === navText.text ? 'nav-link-black'
              : 'nav-link-white'}`}
          >
            <ListItem
              classNames="secondary-content-list text-center"
            >
              {navText.text}
            </ListItem>
          </Navlink>
        ))}
      </UnOrderList>
      }
    </nav>
  );
};

const LargeScreen = ({ activePage }) => (
  <nav className="navbar justify-content-between">
    <p className="custom-mark">Legal</p>
    <UnOrderList
      classNames="d-flex justify-content-between"
    >
      {navArr.map(navText => (
        <Navlink
          key={navText.text}
          href={navText.href}
          classNames={`${activePage === navText.text ? 'nav-link-black' : 'nav-link-white'}`}
        >
          <ListItem classNames="px-2">{navText.text}</ListItem>
        </Navlink>))}
    </UnOrderList>
  </nav>
);

const SeceondaryNavar = ({ activePage }) => (
  <section className="position-relative">
    <div className="d-block d-md-none">
      <SmallScreen activePage={activePage} />
    </div>
    <div className="container d-none d-sm-none d-md-block">
      <LargeScreen activePage={activePage} />
    </div>
  </section>
);

export default SeceondaryNavar;


SeceondaryNavar.defaultProps = {
  activePage: '',
};

SeceondaryNavar.propTypes = {
  activePage: PropTypes.string,
};


LargeScreen.defaultProps = {
  activePage: '',
};

LargeScreen.propTypes = {
  activePage: PropTypes.string,
};


SmallScreen.defaultProps = {
  activePage: '',
};

SmallScreen.propTypes = {
  activePage: PropTypes.string,
};
