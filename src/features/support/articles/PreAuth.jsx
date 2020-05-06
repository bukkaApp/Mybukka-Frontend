import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import Voting from '../voting/Voting';
import BannerSection from '../common/BannerSection';

const MainSection = () => (
  <div>
    <div className="support-main-section-container">
      <div className="col-md-12 pl-0">
        <div className="article-heading">
          Questions about pending charges
        </div>
        <div className="articles-body">
          <div className="article-body-content">
            <p className="p1">
              When placing an order,
              Mybukka will verify your card by placing a temporary authorization
              (temp auth) on your account.
            </p>
            <p className="p1">
              Still seeing&nbsp;two&nbsp;payments&nbsp;on your bank account?
              Don’t worry — it’s not an additional charge. Here’s how it works:
              To guarantee payment for your order,
              we authorize your card to ensure it’s valid and there are sufficient
              funds available to place your order.
              This is a common practice used as an extra layer of security
              for all parties.&nbsp;
            </p>
            <p className="p1">
              This temporary authorization, which is typically
              slightly more than your initial order price, expires
              within 1-3 days of your completed delivery.
              You will only be charged for your order total.
              The final charge amount will be posted
              within 24 hours, and the total will include
              the name of the merchant or restaurant you ordered from.
              After processing (within 1-3 days), your bank statement
              will appear similar to the below, showing the original order charge
              and reversal of the temp auth:
            </p>
            <p className="p1">
              <img
                src="https://res.cloudinary.com/deqt3envc/image/upload/v1556630037/Receipt.jpg" // eslint-disable-line
                alt="IMG_5634.jpg"
                width="423"
                height="267"
              />
            </p>
            <p className="p1">
              This also occurs when you add a new payment method.
              After adding the new payment method, you will see a $1 temporary
              authorization hold to make sure the card is active.
              The authorization hold is reversed within a few days,
              depending on your bank policy.
            </p>
            <p className="p1">Also, if your delivery is cancelled,
              the temp auth will be reversed within a few business days.
              Temporary authorizations apply to Apple Pay or
              Android Pay as well.
            </p>
            <p className="p1">
              You’ll see a temporary authorization on all Mybukka orders.
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
        <Voting />
      </div>
    </div>
    <Footer />
  </div>
);

const PreAuth = ({ id }) => {
  if (id !== 'pre-auth' && id !== '224518507-article-Question-about-pending-charges') {
    return null;
  }
  return (
    <div>
      <BannerSection />
      <MainSection />
    </div>
  );
};

export default PreAuth;

PreAuth.propTypes = {
  id: PropTypes.string.isRequired,
};
