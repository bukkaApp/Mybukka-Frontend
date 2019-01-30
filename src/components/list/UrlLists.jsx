import React from 'react';
import PropTypes from 'prop-types';
import Navlink from '../navlink/Navlink';

import './urllist.scss';

const UrlLists = ({ links }) => (
  <ul className="list-group">
    {links.map(each => (
      <li className="list-item-white" key={each.key}>
        <Navlink
          text={each.text}
          href={each.href}
          classNames="nav-link-white"
        />
      </li>
    ))}
  </ul>
);

export default UrlLists;

UrlLists.propTypes = {
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
