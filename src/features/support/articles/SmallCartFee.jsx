import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'Components/footer/Footer';
import Voting from '../voting/Voting';
import BannerSection from '../common/BannerSection';

const cartFee = 696.50;
const regularFee = 4200.00;
const minimumCartFee = 3500;
const percentOnFee = 5250.00;

const MainSection = () => (
  <div>
    <div className="support-main-section-container">
      <div className="col-md-12 pl-0">
        <div className="article-heading">
          My account has an unrecognized charge
        </div>
        <div className="articles-body">
          <div className="article-body-content">
            <p className="p1">
              If your order doesn’t reach a certain minimum price,
              we charge a small cart fee of ₦{cartFee}. In LA,
              that minimum is ₦{minimumCartFee}. Everywhere else, {'it’s'} ₦{regularFee}.
            </p>
            <p className="p1">
              Sometimes, we {'don\'t'} know exactly how much your
              items are going to cost at the store. So we may
              quote you the small cart fee but not charge it,
              or we may not quote it, but end up charging it.
            </p>
            <p className="p1">
              We know this fee can be a bit of a bummer.
              But an easy way to avoid this fee is by signing up
              for Mybukka Unlimited.
              You’ll get free delivery on orders over ₦{percentOnFee} and
              never get hit with a small cart fee again.
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

const SmallCartFee = ({ id }) => {
  if (id !== '360000007343-article-What-is-the-small-cart-fee-') {
    return null;
  }
  return (
    <div>
      <BannerSection />
      <MainSection />
    </div>
  );
};

export default SmallCartFee;

SmallCartFee.propTypes = {
  id: PropTypes.string.isRequired,
};

