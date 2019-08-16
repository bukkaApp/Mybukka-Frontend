import React from 'react';

import PropTypes from 'prop-types';

import Navbar from 'Components/navbar/AuthenticaticatedNavbar';
import ModalRoot from '../modal-root/Index';
import Transaction from './components/Transaction';
import Data from './inputData.json';

import './index.scss';

const Index = ({ history: { push } }) => (
  <>
    <ModalRoot push={push} />
    <Navbar push={push} />
    <Transaction data={Data} />
  </>
);

export default Index;

Index.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};
