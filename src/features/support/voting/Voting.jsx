import React, { useState } from 'react';
import Cross from './Cross';
import Mark from './Mark';
import './voting.scss';

const Voting = () => {
  const [voted, vote] = useState('');
  return (
    <div className="voting-container">
      <div data-cy="voting-buttons" className="voting-buttons">
        <div className="voting-text">
          <span>Was this article helpful?</span>
        </div>
        <div className="voting-button-group">
          <div
            tabIndex="0"
            aria-pressed="false"
            role="button"
            onClick={() => vote('yes')}
            className={voted === 'yes' ? 'voting-single-active'
              : 'voting-single-button'}
          >
            <Mark />
            <div className="voting-single-button-text">
              <span>yes</span>
            </div>
          </div>
          <div
            tabIndex="0"
            aria-pressed="false"
            role="button"
            onClick={() => vote('no')}
            className={voted === 'no' ? 'voting-single-active'
              : 'voting-single-button'}
          >
            <Cross />
            <div className="voting-single-button-text">
              <span>no</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;
