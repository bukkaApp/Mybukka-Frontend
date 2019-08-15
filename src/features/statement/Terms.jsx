import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthModal from 'Components/navbar/common/AuthModal';
import Statement from './component/Statement';
import data from './inputData/terms.json';


const Terms = ({ history: { push } }) => (
  <Fragment>
    <AuthModal push={push} />
    <Statement activePage="Terms of Service" data={data} />
  </Fragment>
);

export default Terms;

Terms.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
