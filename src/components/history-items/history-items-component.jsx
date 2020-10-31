import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HistoryDailyTransaction from '../history-sub-transaction/history-sub-transaction.component';
// import { getSubHistory } from '../../redux/history/history.action';
import calculateDate from '../../utils/calculateDate';
// import Spinner from './../spinner/spinner';

import './history-items.style.scss';

const HistoryItemsComponent = ({ data }) => {
  const [viewChild, setViewChild] = useState(false);
  const {
    time,
    status,
    type,
    deliveryAddress: { name, address },
    total,
    createdAt,
    cart: { items },
  } = data;
  const start = calculateDate(createdAt);
  let count = items.map((i) => i.quantity).reduce((a, b) => a + b, 0);
  return (
    <React.Fragment>
      <tr className="history-table-row">
        <td className="row-desc-date">
          <h6>{start.date}</h6>
          <p>{start.year}</p>
        </td>
        <td className="row-desc">₦{total}</td>
        <td className="row-desc">{count}</td>
        <td className="row-desc">{address}</td>
        <td className="row-desc">{name}</td>
        {/* <td className="row-desc">{type}</td> */}
        <td className="row-desc">{status}</td>
      </tr>
    </React.Fragment>
  );
};
HistoryItemsComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memo(HistoryItemsComponent);
