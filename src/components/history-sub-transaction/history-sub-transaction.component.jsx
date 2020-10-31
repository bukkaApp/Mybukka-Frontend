import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { ReactComponent as DropdownIcon } from '../../assets/dropdown-icon.svg';
// import { historySubCurrentView } from './../../redux/history/history.action';
import isArrayEmpty from './../../utils/isArrayEmpty';

import './history-sub-transaction.styles.scss';
const HistoryDailyTransaction = ({
  data,
  offlineOrder,
  slug,
  historySubCurrentView,
}) => {
  let view = data.filter((item) => item.shiftSlug === slug);
  let offlineOrderFilter = offlineOrder
    ? offlineOrder.filter((item) => item.shiftSlug === slug)
    : [];
  view = [...view, ...offlineOrderFilter];

  return (
    <div className="history-daily-table-container">
      <table>
        <tbody>
          <tr className="history-daily-table-header">
            <th className="header-desc">Transaction date</th>
            <th className="header-desc">Amount Payable</th>
            <th className="header-desc">Count</th>
            <th className="header-desc">Order ID</th>
            <th className="header-desc">Type</th>
            <th className="header-desc">Payment Method</th>
            <th className="header-desc">Time</th>
          </tr>
          {!isArrayEmpty(view) ? (
            view.map((item, index) => (
              <HistorySubTransaction
                key={index}
                data={item}
                handleSubView={historySubCurrentView}
              />
            ))
          ) : (
            <tr>
              <td>You took no order in this shift</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const HistorySubTransaction = ({ data, handleSubView }) => {
  const {
    time,
    total,
    type,
    _id,
    day,
    cart: { items },
  } = data;
  const dateArray = day.split(' ');
  return (
    <tr className="history-daily-table-row">
      <td className="row-desc-date">
        <h6>{dateArray[1]}</h6>
        <p>{dateArray[2]}</p>
      </td>
      <td className="row-desc">₦{total || 0}</td>
      <td className="row-desc">{items.length || 0}</td>
      <td className="row-desc">{_id}</td>
      <td className="row-desc">{type}</td>
      <td className="row-desc">
        {data.authCode ? 'Bank Transfer' : data.paymentMethod}
      </td>
      <td className="row-desc">{time}</td>
      <td className="row-desc cursor" onClick={() => handleSubView(data)}>
        {/* <DropdownIcon /> */}V
      </td>
    </tr>
  );
};
HistorySubTransaction.propTypes = {
  data: PropTypes.object.isRequired,
  handleSubView: PropTypes.isRequired,
};

HistoryDailyTransaction.propTypes = {
  data: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   historySubCurrentView: (payload) => dispatch(historySubCurrentView(payload)),
// });

// export default connect(null, mapDispatchToProps)(memo(HistoryDailyTransaction));
export default memo(HistoryDailyTransaction);
