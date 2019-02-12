import React, { Fragment } from 'react';
import AddedItems from './AddedItems';
import SuggestedItems from './SuggestedItems';
import TotalAmount from './TotalAmt';

const CartDetails = () => (
  <Fragment>
    <div className="card-body">
      <AddedItems />
    </div>
    <SuggestedItems />
    <div className="card-body">
      <TotalAmount />
    </div>
  </Fragment>
);

export default CartDetails;
