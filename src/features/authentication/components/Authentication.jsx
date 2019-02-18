import React from 'react';

import PropTypes from 'prop-types';

import Container from 'Components/container';

import Form from './Form';
import Logo from '../common/Logo';

import './authentication.scss';

const Wrapper = ({ children }) => (
  <div className="form-wrapper mx-auto col-lg-4 col-md-6 col-sm-6">
    {children}
  </div>
);

const Authentication = ({ ...props }) => (
  <div className="bg-color full-height">
    <Container classNames="form-container">
      <Wrapper>
        <h2 className="text-center pt-4 font-size">{props.title}</h2>
        <Form {...props} />
      </Wrapper>
    </Container>
    <Logo />
  </div>
);

export default Authentication;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

Authentication.propTypes = {
  title: PropTypes.string.isRequired
};
