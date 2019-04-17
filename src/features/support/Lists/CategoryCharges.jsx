import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import Voting from '../voting/Voting';
import BannerSection from '../common/BannerSection';
import ListCategory from './ListCategory';

import data from '../inputData/lists.json';

const MainSection = () => (
  <div>
    <div className="support-main-section-container">
      <div className="col-md-12 pl-0">
        <div className="article-heading pl-3">
            Charges
        </div>
        <div className="personalized-header-divider" />
        {
          data.map(topicList => (
            <ListCategory
              key={topicList.text + topicList.link}
              text={topicList.text}
              link={topicList.link}
            />
          ))
        }
        <Voting />
      </div>
    </div>
    <Footer />
  </div>
);

const CategoryCharges = ({ id }) => {
  if (id !== '115001260986-category-Charges') {
    return null;
  }
  return (
    <div>
      <BannerSection />
      <MainSection />
    </div>
  );
};

export default CategoryCharges;

CategoryCharges.propTypes = {
  id: PropTypes.string.isRequired,
};
