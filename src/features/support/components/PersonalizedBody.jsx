import React from 'react';
import PropTypes from 'prop-types';
import ChevronRight from '../../../components/icons/ChevronRight';

import './personalizedbody.scss';

const PersonalizedBody = ({ text }) => (
  <div>
    <a className="personalized-body-section" href="/bukka">
      <div className="personalized-body-content">
        <div className="personalized-body-text">{text}</div>
      </div>
      <div
        className="personalized-header-icon text-color"
      >
        <ChevronRight />
      </div>
    </a>
    <div className="personalized-header-divider" />
  </div>

);

export default PersonalizedBody;

PersonalizedBody.propTypes = {
  text: PropTypes.string.isRequired
};

