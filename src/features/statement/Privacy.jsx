import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalRoot from '../modal-root/Index';
import Statement from './component/Statement';
import data from './inputData/privacy.json';


const Privacy = ({ history: { push } }) => (
  <Fragment>
    <ModalRoot push={push} />
    <Statement activePage="Privacy Policy" data={data} />
  </Fragment>
);

export default Privacy;

Privacy.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
