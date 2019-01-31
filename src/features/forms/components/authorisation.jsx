/* eslint-disable react/prop-types */
import React from 'react';
import './authorisation.scss';
import Form from './form';
import Logo from '../common/Logo';

const Container = props => <div className="form-container">{props.children}</div>;

const Wrapper = props => <div className="form-wrapper mx-auto col-lg-4 col-md-6 col-sm-6">{props.children}</div>;

const authorisation = ({ ...props }) => (
  <div className="bg-color full-height">
    <Container>
      <Wrapper>
        <h2 className="text-center pt-4 font-size">{ props.title }</h2>
        <Form {...props} />
      </Wrapper>
    </Container>
    <Logo />
  </div>
);

export default authorisation;
