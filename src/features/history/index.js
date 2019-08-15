import React from 'react';

import PropTypes from 'prop-types';

import AuthModal from 'Components/navbar/common/AuthModal';
import Navbar from 'Components/navbar/AuthenticaticatedNavbar';
import Transaction from './components/Transaction';
import Data from './inputData.json';

import './index.scss';

const Index = ({ history: { push } }) => (
  <>
    <AuthModal push={push} />
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
