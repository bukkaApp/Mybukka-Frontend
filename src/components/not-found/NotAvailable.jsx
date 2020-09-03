import React from 'react';

import Container from '../container';

import './notavailable.scss';

const NotAvailable = () => (
  <div className="bg-color not-available-page">
    <Container>
      <h1 className="text-title-unavailable">
        Mybuka Not
        <br />
        Available In Your
        <br />
        Location
        <br />
      </h1>
    </Container>
  </div>
);

export default NotAvailable;
