import React from 'react';
import PropTypes from 'prop-types';
import PreAuth from './PreAuth';
import CancelSubscription from './CancelSubscription';
import CreditsAndPromotions from './CreditsAndPromotions';
import WhatIsMybukkaUnlimited from './WhatIsMybukkaUnlimited';
import UnRecognizedCharge from './UnRecognizedCharge';
import SmallCartFee from './SmallCartFee';
import './articles.scss';

const Articles = ({ location }) => {
  const locationPathName = location.pathname;
  const covertPathNameToArray = locationPathName.split('/');
  const PageId = covertPathNameToArray[3];

  return (
    <div>
      <PreAuth id={PageId} />
      <CancelSubscription id={PageId} />
      <CreditsAndPromotions id={PageId} />
      <WhatIsMybukkaUnlimited id={PageId} />
      <UnRecognizedCharge id={PageId} />
      <SmallCartFee id={PageId} />
    </div>
  );
};

export default Articles;

Articles.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string
    ])
  ).isRequired,
};
