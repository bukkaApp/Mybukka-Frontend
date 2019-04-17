import React from 'react';
import PropTypes from 'prop-types';
import Navlink from 'Components/navlink/Navlink';
import ChevronRight from '../../../components/icons/ChevronRight';


const ListCategory = ({ text, link }) => (
  <div>
    <Navlink classNames="personalized-body-section" href={link}>
      <div className="personalized-body-content">
        <div className="personalized-body-text">{text}</div>
      </div>
      <div
        className="personalized-header-icon text-dark"
      >
        <ChevronRight />
      </div>
    </Navlink>
  </div>

);

export default ListCategory;

ListCategory.defaultProps = {
  link: '/'
};

ListCategory.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};

