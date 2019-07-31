import React, { useState } from 'react';
import ChevronVertical from 'Icons/ChevronVertical';

import { UnOrderList, ListItem } from '../common/List';

const navArr = [{ text: 'Terms of Service' }, { text: 'Gift Cards' }, { text: 'Privacy Policy' }, { text: 'Shipping Policy' }];

const SmallScreen = () => {
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
          <ListItem classNames="secondary-content-list text-muted text-center">
            {navText.text}
          </ListItem>
        ))}
      </UnOrderList>
      }
    </nav>
  );
};

const LargeScreen = () => (
  <nav className="navbar justify-content-between">
    <p className="custom-mark">Legal</p>
    <UnOrderList
      classNames="d-flex justify-content-between"
    >
      {navArr.map(navText => (
        <ListItem classNames="px-2 text-muted">{navText.text}</ListItem>))}
    </UnOrderList>
  </nav>
);

const SeceondaryNavar = () => (
  <section className="position-relative">
    <div className="d-block d-md-none">
      <SmallScreen />
    </div>
    <div className="container d-none d-sm-none d-md-block">
      <LargeScreen />
    </div>
  </section>
);

export default SeceondaryNavar;
