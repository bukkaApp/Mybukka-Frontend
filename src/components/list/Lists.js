import React from 'react';
import { Link } from 'react-router-dom';

const Lists = ({ lists, handleClick, classNames, maxHeight, pathname, link }) => {
  const resolveValidId = title => title.replace(/ /g, '-').replace(/'/g, '-').replace(/₦/g, '-');

  const linkListsJsx = () => lists.map(list => (
    <Link
      key={`${pathname || ''}#${list.replace(/ /g, '-')}`}
      to={`${pathname || ''}#${resolveValidId(list)}`}
    >
      <div
        tabIndex="0"
        role="button"
        aria-pressed="false"
        className="custom-duration-dropdown-item"
      >
        <span>{list}</span>
      </div>
    </Link>
  ));

  const listItemsJsx = () => lists.map(list => (
    <div
      key={list}
      tabIndex="0"
      role="button"
      aria-pressed="false"
      onClick={() => handleClick(list)}
      className="custom-duration-dropdown-item"
    >
      <span>{list}</span>
    </div>
  ));

  return (
    <div className={`custom-duration-dropdown ${classNames}`}>
      <div className={`custom-duration-dropdown-content ${maxHeight}`}>
        {link ? linkListsJsx() : listItemsJsx()}
      </div>
    </div>
  );
};

export default Lists;
