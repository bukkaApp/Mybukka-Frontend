import React from 'react';
import PropTypes from 'prop-types';

import SearchPlusMenu from 'Components/icons/SearchPlusMenu';
import { useModalContext } from '../../context/ModalContext';

import './bukkaNavSmallScreen.scss';

const BukkaNavSmallScreen = ({ currentCategory, classNames, }) => {
  const { setModal, setCatelogsOnSmallScreenPopup } = useModalContext();

  const onClick = () => {
    setModal(true);
    setCatelogsOnSmallScreenPopup(true);
  };

  return (
    <div className={`bukka-nav-small d-block d-sm-block d-md-none
    d-lg-none d-xl-none ${classNames}`}
    >
      <nav className="container navbar navbar-light bukka-nav-small-content">
        <div className="current-category">
          <h5 className="current-category-text">{currentCategory || 'Categories'}</h5>
        </div>
        <div tabIndex="0" aria-pressed="false" role="button" onClick={onClick}>
          <SearchPlusMenu />
        </div>
      </nav>
    </div>
  );
};

export default BukkaNavSmallScreen;

BukkaNavSmallScreen.defaultProps = {
  classNames: '',
  uniqueCatelogs: [],
};

BukkaNavSmallScreen.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};
