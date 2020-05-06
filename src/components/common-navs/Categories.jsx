import React from 'react';
import PropTypes from 'prop-types';

import ChevronVertical from '../icons/ChevronVertical';
import { TimeLists as CategoryList } from './Duration';
// import CartIconSection from './CartIconSection';
import { ReusableButton, ReusableDropdown, ReusableWrapper }
  from './ReusableNavElements';

import inputData from './inputData/duration';

const { categoryItems } = inputData;

export const CategoryLists = ({ lists, handleClick, section }) => (
  <CategoryList
    handleClick={handleClick}
    lists={lists || categoryItems}
    classNames="category-dropdown-section"
    maxHeight="category-dropdown-height"
    pathname={section}
    link
  />
);

const Categories = props => (
  <ReusableWrapper>
    <ReusableButton {...props}>
      <div>
        <h2 className="current-location-button-text">Categories</h2>
      </div>
      <span className="current-location-button-icon custom-mt-minus1 pl-4">
        <ChevronVertical />
      </span>
    </ReusableButton>
    <ReusableDropdown classNames={`${props.focus ? 'border-none' : 'dropdown--disapear'}`}>
      <CategoryLists lists={props.lists} section={props.section} />
    </ReusableDropdown>
  </ReusableWrapper>
);

export default Categories;

Categories.propTypes = {
  focus: PropTypes.bool.isRequired
};
