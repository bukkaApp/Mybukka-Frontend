import React from 'react';
import { useState } from 'react';

import HistoryTransaction from '../history-transaction/history-transaction.component';
import './history-table.styles.scss';

const HistoryTable = () => {
  const [viewDailyTable, setViewDailyTable] = useState(false);
  const handleClick = () => {
    setViewDailyTable(!viewDailyTable);
  };
  return (
    <div className="history-container">
      <HistoryTransaction handleClick={handleClick} view={viewDailyTable} />
    </div>
  );
};

export default HistoryTable;
