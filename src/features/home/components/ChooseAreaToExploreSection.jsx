import React from 'react';

import shortId from 'shortid';
import PropTypes from 'prop-types';
import Navlink from 'Components/navlink/Navlink';

import './chooseAreaToExplore.scss';

const mockAreas = [
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' },
  { href: '/', text: 'Mende Maryland', id: '1' }
];

const AreasToExploreList = ({ areas }) => (
  <div className="area-to-explore-list">
    <div className="row">
      {areas.map(area => (
        <div className="col col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 list-section" key={shortId.generate()}>
          <Navlink
            href={area.href}
            text={area.text}
            key={area.id}
            classNames="area-link"
          />
        </div>
      ))}
    </div>
  </div>
);

const AreaToExploreHeader = () => (
  <div className="area-explore-header">
    <div className="row">
      <div className="col col-9">
        <h4 className="title">Choose an area to explore</h4>
      </div>
      <div className="col col-3 view-all-section">
        <Navlink href="/" text="View All" classNames="nav-link-view" />
      </div>
    </div>
  </div>
);

const ChooseAreaToExploreSection = () => (
  <div className="container choose-area-section">
    <AreaToExploreHeader />
    <AreasToExploreList areas={mockAreas} />
  </div>
);

export default ChooseAreaToExploreSection;

AreasToExploreList.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
};
