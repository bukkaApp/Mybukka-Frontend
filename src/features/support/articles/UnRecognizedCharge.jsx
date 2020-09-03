import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import Navlink from 'Components/navlink/Navlink';
import Voting from '../voting/Voting';
import BannerSection from '../common/BannerSection';

const style = { fontWeight: 400 };

const MainSection = () => (
  <div>
    <div className="support-main-section-container">
      <div className="col-md-12 pl-0">
        <div className="article-heading">
          My account has an unrecognized charge
        </div>
        <div className="articles-body">
          <div className="article-body-content">
            <p>
              <strong>
                <span className="text-underline">
                  If you see an unfamiliar
                  Mybukka charge on your credit card or bank account,
                  please review these steps.
                </span>
              </strong>
            </p>
            <ol>
              <li>
                <span style={style}>
                  Unrecognized charges can often be tied back to a friend,
                  coworker, or family member who may be using
                  your payment information or a linked account.
                  Please check with your family and friends that may have been
                  previously authorized to use your card.
                </span>
              </li>
              <li>
                <span style={style}>
                  Check your order history to locate the charge.
                  It may be tied to an order {'you\'ve'} placed or a cancellation fee.
                  &nbsp;If you believe you were charged a cancellation fee by mistake,
                  please navigate to Orders &gt; Can I cancel my order.
                </span>
              </li>
              <li>
                <span style={style}>
                  An unrecognized charge may also be a small authorization hold,
                  which is never actually charged to your account,
                  but may appear as {'"pending"'}.
                  All authorization holds are voided within a few business days,
                  depending on your {'bank\'s'} policy. We issue authorization
                  holds as a way to better protect against fraud that may result from
                  unauthorized card usage.
                </span>
              </li>
            </ol>
            <p>
              <strong>
                If you are still unable to recognize a
                Mybukka charge on your account, please share some info{' '}
                <Navlink href="/buyer/contact-us/help">here</Navlink>
              </strong>
              <span style={style}>
                <strong>. {'We\'re'} happy to review and make necessary adjustments
                </strong>.
              </span>
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

const UnRecognizedCharge = ({ id }) => {
  if (id !== '360001201906-article-My-account-has-an-unrecognized-charge') {
    return null;
  }
  return (
    <div>
      <BannerSection />
      <MainSection />
    </div>
  );
};

export default UnRecognizedCharge;

UnRecognizedCharge.propTypes = {
  id: PropTypes.string.isRequired,
};

