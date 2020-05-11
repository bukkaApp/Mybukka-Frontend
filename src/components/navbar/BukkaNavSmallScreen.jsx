import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import inputData from 'Components/common-navs/inputData/duration';

import SearchPlusMenu from 'Components/icons/SearchPlusMenu';
import DismissModal from '../modal/DismissModal';
import Modal from '../modal';
import Field from '../input/Field';

import './bukkaNavSmallScreen.scss';

// const { categoryItems } = inputData;

export const ResponsiveCategories = ({
  placeholderText, categoryItems
}) => (
  <Modal
    classNames="select-delivery-pickup"
    dataTarget="category-small-modal"
    largeOnSmallScreen
  >
    <div className="small-search-container">
      <div className="bukka-nav-small-category-border pb-2">
        <div className="mx-4 row">
          <div className="col-2 px-0">
            <DismissModal classNames="pl-0" />
          </div>
          <div className="col-10">
            <Field.Input
              placeholderText={placeholderText}
              classNames="bukka-nav-search-input"
            />
          </div>
        </div>
      </div>
      <div className="small-search-wrapper">
        <div className="dropdown-suggestion">
          <Fragment>
            <div className="mx-4">
              {categoryItems.map(eachCategory =>
                (<div key={eachCategory} className="bukka-nav-small-category">
                  {eachCategory}
                </div>
                ))}
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  </Modal>
);


const BukkaNavSmallScreen = ({
  currentCategory,
  classNames,
  categoryItems,
}) => (
  <>
    <div className={`bukka-nav-small d-block d-sm-block d-md-none
    d-lg-none d-xl-none ${classNames}`}
    >
      <nav className="container navbar navbar-light bukka-nav-small-content">
        <div className="current-category">
          <h5 className="current-category-text">{currentCategory}</h5>
        </div>
        <div data-target="#category-small-modal" data-toggle="modal">
          <SearchPlusMenu />
        </div>
      </nav>
    </div>
    <ResponsiveCategories
      placeholderText={categoryItems[0]}
      categoryItems={categoryItems}
    />
  </>
);

export default BukkaNavSmallScreen;

BukkaNavSmallScreen.defaultProps = {
  classNames: '',
  categoryItems: [],
};

ResponsiveCategories.defaultProps = {
  categoryItems: [],
  placeholderText: 'breakfast'
};

ResponsiveCategories.propTypes = {
  placeholderText: PropTypes.string,
  categoryItems: PropTypes.arrayOf(PropTypes.string)
};

BukkaNavSmallScreen.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  categoryItems: PropTypes.arrayOf(PropTypes.string)
};
