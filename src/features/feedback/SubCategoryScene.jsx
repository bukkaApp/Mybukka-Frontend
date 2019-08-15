/* eslint-disable array-callback-return */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import BannerSection from '../support/common/BannerSection';
import PersonalizedHeader from '../support/components/PersonalizedHeader';
import { RelatedComplainArticle } from './RelatedComplainArticle';
import exportComplains from '../support/inputData/exportComplains';
import ComplainForm from './ComplainForm';
import './category.scss';
import '../support/components/supportmainsection.scss';


const SubCategory = ({ location }) => {
  const generateSomeContext = () => {
    const complainData = exportComplains
      .filter(eachComplain => eachComplain.link === location.pathname);

    return complainData.map(eachComplainData =>
      (<Fragment>
        <RelatedComplainArticle
          heading={eachComplainData.heading}
          data={eachComplainData.helpYourself}
        />
        <div className="unselectable personalized-header">
          <div className="personalized-header-text text-capitalize">
            {eachComplainData.category}:
            <span className="text-capitalize"> {eachComplainData.text}</span>
          </div>
        </div>
      </Fragment>
      ));
  };

  return (
    <div>
      <BannerSection />
      <div className="support-main-section-container">
        <div className="col-md-12">
          <PersonalizedHeader
            className="unselectable category_heading__text"
            title="Help yourself or report your issue."
          />
          {generateSomeContext()}
          <ComplainForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubCategory;

SubCategory.defaultProps = {
//   topic: ''
};

SubCategory.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string
    ])
  ).isRequired,
//   topic: PropTypes.string,
};
