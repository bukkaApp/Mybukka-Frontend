import React, { memo } from 'react';

import HistoryItemsComponent from '../history-items/history-items-component.jsx';

import './history-transaction.styles.scss';
// import { ReactComponent as NoTask } from '../../assets/to-do.svg';
import { connect } from 'react-redux';
import { useUserContext } from '../../context/UserContext';
// import Spinner from './../spinner/spinner';
// import { getHistory } from './../../redux/history/history.action';

const HistoryTransaction = ({
  handleClick,
  children,
  view,
  // history: { item, page, loading },
  getHistory,
  // loading: { state },
  // loading,
}) => {
  const {
    history: { userOrders },
  } = useUserContext();
  console.log({ history });
  let item = null;
  let page = null;
  let loading = null;
  return (
    <table>
      <tbody>
        <tr className="history-table-header">
          <th className="header-desc">Transaction date</th>
          <th className="header-desc">Total Amount</th>
          <th className="header-desc">Count</th>
          <th className="header-desc">Shift ID</th>
          <th className="header-desc">Opening Time</th>
          <th className="header-desc">Closing time</th>
          <th className="header-desc"></th>
        </tr>
        {userOrders ? (
          userOrders
            .sort((a, b) => new Date(a.date_created) - new Date(b.date_created))
            .map((item, index) => (
              <HistoryItemsComponent
                key={index}
                handleClick={handleClick}
                children={children}
                view={view}
                data={item}
              />
            ))
        ) : (
          <div className="no-content">No content</div>
        )}
        {item && item.length > 10 && (
          <p className="load-more" onClick={() => getHistory((page || 1) + 1)}>
            {loading ? <Spinner /> : 'Load more'}
          </p>
        )}
      </tbody>
    </table>
  );
};
// const mapDispatchToProps = (dispatch) => ({
//   getHistory: (payload) => dispatch(getHistory(payload)),
// });
const mapStateToProps = ({ history, loading }) => ({
  history,
  loading,
});
export default connect(mapStateToProps, null)(memo(HistoryTransaction));
