/* eslint-disable react/prop-types */
import React from 'react';

import PropTypes from 'prop-types';
import Navlink from 'Components/navlink/Navlink';

import useAutocompleteService from '../../../hooks/useAutocompleteService';

import './chooseAreaToExplore.scss';

const mockAreas = [
  { href: '/', text: 'Wilmer Street Ilupeju', id: '11' },
  { href: '/', text: 'Lekki Phase 1', id: '12' },
  { href: '/', text: 'Ikeja lagos', id: '13' },
  { href: '/', text: 'Mende Maryland', id: '14' },
  { href: '/', text: 'Fadeyi Yaba', id: '15' },
  { href: '/', text: 'Ojuelegba Lagos', id: '16' },
  { href: '/', text: 'Lekki Phase 2', id: '17' },
  { href: '/', text: 'Ajah Lagos', id: '18' },
  { href: '/', text: 'Mende Maryland', id: '19' },
  { href: '/', text: 'Mende Maryland', id: '110' },
  { href: '/', text: 'Mende Maryland', id: '111' },
  { href: '/', text: 'Mende Maryland', id: '112' },
  { href: '/', text: 'Mende Maryland', id: '113' },
  { href: '/', text: 'Mende Maryland', id: '114' },
  { href: '/', text: 'Mende Maryland', id: '115' },
  { href: '/', text: 'Mende Maryland', id: '116' }
];

const AreasToExploreList = ({ areas }) => {
  const callback = null, showLoading = true;
  const { handleClick } = useAutocompleteService(callback, showLoading);

  return (
    <div className="area-to-explore-list">
      <div className="row">
        {areas.map(area => (
          <div
            onClick={() => handleClick(area.text)}
            role="button"
            tabIndex="0"
            aria-pressed="false"
            className="col col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 list-section"
            key={area.id}
          >
            <Navlink
              href={area.href}
              text={area.text}
              classNames="area-link"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

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
    <AreasToExploreList
      areas={mockAreas}
    />
  </div>
);

export default ChooseAreaToExploreSection;

AreasToExploreList.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

ChooseAreaToExploreSection.propTypes = {};
