import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

export default function RedirectToStore() {
  return (
    <Fragment>
      <Redirect to="https://google.com" target="_blank" />
    </Fragment>
  );
}
