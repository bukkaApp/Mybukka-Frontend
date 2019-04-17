import React from 'react';
import PropTypes from 'prop-types';
import PreAuth from './PreAuth';
import CancelSubscription from './CancelSubscription';
import CreditsAndPromotions from './CreditsAndPromotions';
import WhatIsMybukkaUnlimited from './WhatIsMybukkaUnlimited';
import UnRecognizedCharge from './UnRecognizedCharge';
import SmallCartFee from './SmallCartFee';
import InternalError from '../../../components/not-found/InternalError';
import urlLists from '../inputData/articlesUrl.json';
import './articles.scss';

const Articles = ({ location, history }) => {
  const locationPathName = location.pathname;
  const covertPathNameToArray = locationPathName.split('/');
  const PageId = covertPathNameToArray[3];

  if (urlLists.includes(`/buyer/articles/${PageId}`)) {
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
  }
  return <InternalError history={history} />;
};

export default Articles;

Articles.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string
    ])
  ).isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.number
    ]))
  ])).isRequired,
};
