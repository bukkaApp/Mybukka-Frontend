import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import Voting from '../voting/Voting';
import BannerSection from '../common/BannerSection';
import GroupContainer, { Message, AccountCredit, AccountCreditExpired } from './GroupContainer';

const MainSection = () => (
  <div>
    <div className="support-main-section-container">
      <div className="col-md-12 pl-0">
        <div className="article-heading">
          Your credits, gift cards, and promotions balance
        </div>
        <GroupContainer title="Credits">
          <Message message="No available credits." />
        </GroupContainer>
        <GroupContainer title="Gift Cards">
          <Message message="No available gift cards." />
        </GroupContainer>
        <GroupContainer title="Gift Cards">
          <AccountCredit />
          <AccountCreditExpired />
        </GroupContainer>
        <Voting />
      </div>
    </div>
    <Footer />
  </div>
);

const CreditsAndPromotions = ({ id }) => {
  if (id !== 'credits-and-promotions') {
    return null;
  }
  return (
    <div>
      <BannerSection />
      <MainSection />
    </div>
  );
};

export default CreditsAndPromotions;

CreditsAndPromotions.propTypes = {
  id: PropTypes.string.isRequired,
};
