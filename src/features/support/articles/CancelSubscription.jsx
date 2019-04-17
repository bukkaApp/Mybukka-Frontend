import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import Voting from '../voting/Voting';
import BannerSection from '../common/BannerSection';
import SubscriptionCancelMethods from './SubscriptionCancelMethods';

const MainSection = () => (
  <div>
    <div className="support-main-section-container">
      <div className="col-md-12 pl-0">
        <div className="article-heading">
            Cancel my Mybukka Unlimited subscription
        </div>
        <div className="articles-body">
          <div className="article-body-content">
            <p className="p1">
            If you signed up for a free trial and cancel before your
            free trial ends, you will not be charged.
            </p>
            <p className="p1">
            If you cancel after your free trial ends,
            you must cancel your membership before the next renewal date
            to avoid payment of the next billing cycle.
            </p>
            <p className="p1">
            If you cancel a annual or monthly membership that {'you\'ve '}
            used, you will not receive any refund but you will be able
            to use your Unlimited membership for the remainder of
            your pre-paid membership term.
            </p>
            <div data-cy="platform-link" className="css-dbpu1g">
              <a href="/profile">
                <div className="article-button" data-cy="page-button">
                  <div className="article-button-text">Cancel subscription</div>
                </div>
              </a>
            </div>
            <div className="p-2" />
          </div>
        </div>
        <SubscriptionCancelMethods />
        <Voting />
      </div>
    </div>
    <Footer />
  </div>
);

const CancelSubscription = ({ id }) => {
  if (id !== 'cancel-subscription') {
    return null;
  }
  return (
    <div>
      <BannerSection />
      <MainSection />
    </div>
  );
};

export default CancelSubscription;

CancelSubscription.propTypes = {
  id: PropTypes.string.isRequired,
};
