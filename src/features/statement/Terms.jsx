import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalRoot from '../modal-root/Index';
import Statement from './component/Statement';
import data from './inputData/terms.json';


const Terms = ({ history: { push } }) => (
  <Fragment>
    <ModalRoot push={push} />
    <Statement activePage="Terms of Service" data={data} />
  </Fragment>
);

export default Terms;

Terms.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
