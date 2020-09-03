import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import BannerSection from '../support/common/BannerSection';
import PersonalizedHeader from '../support/components/PersonalizedHeader';
import PersonalizedBody from '../support/components/PersonalizedBody';
import complains from '../support/inputData/complains.json';

import './category.scss';
import '../support/components/supportmainsection.scss';

const categoryLocation = complains.categoryLocation;

const ComplainSection = ({ subCategoryComplain }) => (
  <div className="support-main-section-container">
    <div className="col-md-12">
      <PersonalizedHeader
        className="unselectable category_heading__text"
        title="Tell us more about your issue."
      />
      {subCategoryComplain.map(topic => (
        <PersonalizedBody key={topic.text} text={topic.text} link={topic.link} />
      ))}
    </div>
  </div>
);

const SubCategory = ({ location }) => (
  <div>
    <BannerSection />
    {
      Object.keys(complains.subCategory).map((eachComplainSection) => {
        if (categoryLocation[eachComplainSection] === location.pathname) {
          return (<ComplainSection
            key={categoryLocation[eachComplainSection]}
            subCategoryComplain={complains.subCategory[eachComplainSection]}
          />);
        }
        return null;
      })
    }
    <Footer />
  </div>
);

export default SubCategory;

ComplainSection.propTypes = {
  subCategoryComplain: PropTypes.arrayOf(PropTypes.object).isRequired,
};


SubCategory.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string
    ])
  ).isRequired
};
