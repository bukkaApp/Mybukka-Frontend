import React, { Fragment } from 'react';

import Container from 'Components/container';
import AddedItems from './AddedItems';
import SuggestedItems from './SuggestedItems';
import TotalAmount from './TotalAmt';

const CartDetails = () => (
  <Fragment>
    <Container classNames="added-items-wrapper">
      <AddedItems />
    </Container>
    <SuggestedItems />
    <Container className="total-amounts-wrapper">
      <TotalAmount />
    </Container>
  </Fragment>
);

export default CartDetails;
