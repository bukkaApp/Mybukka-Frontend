import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

export default () => (
  <Fragment>
    <Redirect to="https://google.com" target="_blank" />
  </Fragment>
);
