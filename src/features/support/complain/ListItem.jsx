/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ listType, items }) => {
  if (listType === 'number') {
    return (
      <ol className="dropdown_article_item">
        {
          items.map(item => <li>{item}</li>)
        }
      </ol>
    );
  }
  return (
    <ul className="dropdown_article_item">
      {
        items.map(item => <li>{item}</li>)
      }
    </ul>
  );
};

export default ListItem;

ListItem.defaultProps = {
  listType: '',
};

ListItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  listType: PropTypes.string,
};
