import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthModal from 'Components/navbar/common/AuthModal';
import Statement from './component/Statement';
import data from './inputData/privacy.json';


const Privacy = ({ history: { push } }) => (
  <Fragment>
    <AuthModal push={push} />
    <Statement activePage="Privacy Policy" data={data} />
  </Fragment>
);

export default Privacy;

Privacy.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
