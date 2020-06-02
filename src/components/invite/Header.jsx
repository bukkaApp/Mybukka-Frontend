import React from 'react';
import Img from '../img/Img';
// import PropTypes from 'prop-types';

const Header = () => (
  <section>
    <Img
      options={{ w: 350 }}
      src="https://res.cloudinary.com/mybukka/image/upload/v1564685613/referral-card_gd2b0v.png"
      className="figure-img img-fluid rounded"
      alt="invite-friends-fig"
    />
  </section>
);

export default Header;

// InviteFriends.propTypes = {
//   push: PropTypes.func.isRequired
// };