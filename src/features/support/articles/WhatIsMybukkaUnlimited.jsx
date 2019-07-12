import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import Voting from '../voting/Voting';
import BannerSection from '../common/BannerSection';

const monthly = 3496.50;
const yearly = 33558.00;
const orderOverCertainAmount = 5250.00;
const MainSection = () => (
  <div>
    <div className="support-main-section-container">
      <div className="col-md-12 pl-0">
        <div className="article-heading">
            What is Mybukka Unlimited?
        </div>
        <div className="articles-body">
          <div className="article-body-content">
            <p className="p1">
                Mybukka Unlimited is our membership service.
                For ₦{monthly}/month or ₦{yearly}/year, members receive
                free delivery on ordersfrom all merchants on the mybukka platform {/* eslint-disable-line */}
                when the order size is over ₦{orderOverCertainAmount}. Additionally, member orders {/* eslint-disable-line */}
                will never have to pay a small cart fee or Blitz fee (surge).
            </p>
            <p><strong className="text-dark">Signing Up</strong></p>
            <p>
              <span style={{ fontWeight: 400 }}>
                To sign up, open the mobile app
                (iOS, Android) or go to Mybukka.com,
                navigate to your Account Settings, and tap on
                “Get Unlimited” in the menu. Select a plan (monthly or annual)
                and a payment method and tap the confirmation button to complete
                the signup process.
              </span>
            </p>
            <p><strong className="text-dark">Charges</strong></p>
            <p className="p1">
                If you choose a monthly membership,
                your membership fee will be ₦{monthly}/month and
                will auto-renew every month on your membership billing date.
                If you choose an annual membership,
                your membership fee will be ₦{yearly}/year
                and it will auto-renew every year on your membership billing date. {/* eslint-disable-line */}
                Your Mybukka Unlimited membership fee is non-refundable,
                unless we determine otherwise.
            </p>
            <p><strong className="text-dark">Availability</strong></p>
            <p className="p1">
                Mybukka Unlimited is available in each city we operate in.
                The delivery fee (for orders over ₦{orderOverCertainAmount}), small cart fee, {/* eslint-disable-line */}
                and Blitz fee will not be added to any order
                placed on web or mobile (iOS, Android).
            </p>
            <p><strong className="text-dark">Canceling</strong></p>
            <p className="p1">
                For information on how to cancel your
                monthly membership,{' '}
              <a href="/buyer/articles/cancel-subscription" target="_self">click here</a>. {/* eslint-disable-line */}
            </p>
            <div className="p-2" />
          </div>
        </div>
        <Voting />
      </div>
    </div>
    <Footer />
  </div>
);

const WhatIsMybukkaUnlimited = ({ id }) => {
  if (id !== '220089047-article-What-is-bukka-Unlimited-') {
    return null;
  }
  return (
    <div>
      <BannerSection />
      <MainSection />
    </div>
  );
};

export default WhatIsMybukkaUnlimited;

WhatIsMybukkaUnlimited.propTypes = {
  id: PropTypes.string.isRequired,
};
