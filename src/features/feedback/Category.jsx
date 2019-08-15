import React from 'react';
// import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import BannerSection from '../support/common/BannerSection';
import PersonalizedHeader from '../support/components/PersonalizedHeader';
import PersonalizedBody from '../support/components/PersonalizedBody';
import postData from '../support/inputData/complains.json';

import './category.scss';
import '../support/components/supportmainsection.scss';

const Category = () => (
  <div>
    <BannerSection />
    <div className="support-main-section-container">
      <div className="col-md-12">
        <PersonalizedHeader
          className="unselectable category_heading__text"
          title="What can we help you with?"
        />
        {postData.category.map(topic => (
          <PersonalizedBody text={topic.text} link={topic.link} />
        ))}
      </div>
    </div>
    <Footer />
  </div>

);

export default Category;

Category.propTypes = {
  // authenticated: PropTypes.bool.isRequired,
};

