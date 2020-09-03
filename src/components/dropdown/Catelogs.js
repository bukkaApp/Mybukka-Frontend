import React from 'react';
import PropTypes from 'prop-types';

import ChevronVertical from '../icons/ChevronVertical';
import Lists from '../list/Lists';
import { ReusableButton, ReusableDropdown, ReusableWrapper }
  from '../common-navs/ReusableNavElements';
import './Catelogs.scss';


const CatelogItems = ({ lists, handleClick, section }) => (
  lists && <Lists
    handleClick={handleClick}
    lists={lists}
    classNames="category-dropdown-section"
    maxHeight="category-dropdown-height"
    pathname={section}
    link
  />
);

const Catelogs = props => (
  <ReusableWrapper>
    <ReusableButton {...props}>
      <div className="Catelogs--dropdown">
        <h2 className="current-location-button-text">{props.activeItem || 'Categories'}</h2>
      </div>
      <span className="current-location-button-icon custom-mt-minus1 pl-4">
        <ChevronVertical />
      </span>
    </ReusableButton>
    <ReusableDropdown classNames={`${props.focus ? 'border-none' : 'dropdown--disapear'}`}>
      <CatelogItems lists={props.lists} section={props.section} />
    </ReusableDropdown>
  </ReusableWrapper>
);

export default Catelogs;

Catelogs.propTypes = {
  focus: PropTypes.bool.isRequired
};
