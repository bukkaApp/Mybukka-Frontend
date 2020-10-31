import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HistoryDailyTransaction from '../history-sub-transaction/history-sub-transaction.component';
// import { getSubHistory } from '../../redux/history/history.action';
import calculateDate from '../../utils/calculateDate';
// import Spinner from './../spinner/spinner';

import './history-items.style.scss';

const HistoryItemsComponent = ({ data, getSubItems }) => {
  const [viewChild, setViewChild] = useState(false);
  const {
    time,
    status,
    type,
    deliveryAddress: { name, address },
    total,
    createdAt,
  } = data;
  let loading = null;
  let subItems = null;
  const isOpen = viewChild && !loading && subItems;
  const handleOpenSub = () => {
    if (!viewChild) {
      getSubItems(status);
    }
    setViewChild(!viewChild);
  };
  const start = calculateDate(createdAt);
  console.log({ start, createdAt });
  // const endTime = end && end.time && calculateDate(end.time);
  const splitTime = time.split('-');
  return (
    <React.Fragment>
      <tr className="history-table-row">
        <td className="row-desc-date">
          <h6>{start.date}</h6>
          <p>{start.year}</p>
        </td>
        <td className="row-desc">₦{total}</td>
        <td className="row-desc">{status}</td>
        <td className="row-desc">{address}</td>
        <td className="row-desc">{name}</td>
        <td className="row-desc">{type}</td>
        <td className="row-desc view" onClick={handleOpenSub}>
          {viewChild && loading ? 'loading' : isOpen ? 'Close' : 'View'}
        </td>
      </tr>
      <tr
        className={` sub-table ${isOpen ? 'show-table' : 'show-table_none'} `}
      >
        {/* <HistoryDailyTransaction
          data={subItems}
          // offlineOrder={orders}
          // slug={slug}
        /> */}
      </tr>
    </React.Fragment>
  );
};
HistoryItemsComponent.propTypes = {
  data: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  chidren: PropTypes.func,
  view: PropTypes.bool.isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   getSubItems: (id) => dispatch(getSubHistory(id)),
// });
const mapStateToProps = ({ history, instore }) => ({
  history,
  instore,
});
export default connect(mapStateToProps, null)(memo(HistoryItemsComponent));
