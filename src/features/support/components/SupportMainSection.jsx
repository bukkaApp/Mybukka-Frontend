import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import PersonalizedHelp from './PersonalizedHelp';
import RecentOrder from './RecentOrder';
import PersonalizedHeader from './PersonalizedHeader';
import PersonalizedBody from './PersonalizedBody';
import postData from '../inputData/data.json';

import './supportmainsection.scss';


const SupportMainSection = ({ authenticated }) => (
  <div>
    <div className="support-main-section-container">
      <RecentOrder authenticated={authenticated} />
      <PersonalizedHelp authenticated={authenticated} />
      {Object.keys(postData).map(topic => (
        <div className="col-md-6">
          <PersonalizedHeader title={topic} />
          {postData[topic].map(content => (
            <PersonalizedBody text={content.text} link={content.link} />
          ))}
        </div>
      ))}
    </div>
    <Footer />
  </div>

);

export default SupportMainSection;

SupportMainSection.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

