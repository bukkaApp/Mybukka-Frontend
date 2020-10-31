import React, { memo } from 'react';

import HistoryItemsComponent from '../history-items/history-items-component.jsx';

import './history-transaction.styles.scss';
import { useUserContext } from '../../context/UserContext';

const HistoryTransaction = ({ handleClick, children, view }) => {
  const { history } = useUserContext();
  return (
    <table>
      <tbody>
        <tr className="history-table-header">
          <th className="header-desc">Transaction date</th>
          <th className="header-desc">Total Amount</th>
          <th className="header-desc">Item count</th>
          <th className="header-desc">address</th>
          <th className="header-desc">ordered by</th>
          {/* <th className="header-desc">type</th> */}
          <th className="header-desc">Status</th>
        </tr>
        {history?.userOrders
          .sort((a, b) => new Date(a.date_created) - new Date(b.date_created))
          .map((item, index) => (
            <HistoryItemsComponent
              key={index}
              handleClick={handleClick}
              children={children}
              view={view}
              data={item}
            />
          )) || <div className="no-content">No content</div>}
      </tbody>
    </table>
  );
};

export default memo(HistoryTransaction);
