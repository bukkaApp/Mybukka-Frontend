/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import Chevron from 'Components/icons/ChevronRight';
import timeDetails from '../InputAttribute/inputData.json';
import './time.scss';
import Demarcation from '../common/SmallScreenDivider';

const DoubledChevron = () => (
  <div className="d-flex flex-column p-0 doubled-chevron">
    <div className="rotate-up p-0"><Chevron /></div>
    <div className="rotate-down p-0"><Chevron /></div>
  </div>
);

const Time = () => {
  let timing = true;
  const [timeChanged, setTimeChanged] = useState(false);
  const [activeTime, setActiveTime] = useState(0);

  const handleClick = (index) => {
    setTimeChanged(!timeChanged);
    if (timeChanged) {
      timing = false;
    }
    if (!timing) {
      setActiveTime(index);
    }
  };

  return (
    <section className="mb-2 mt-4 mb-2">
      <Demarcation />
      <h2 className="font-size-16 px-3 px-md-3 px-lg-0">Time</h2>
      <ul className={
        ['list-group mt-4', timeChanged ? 'time-dropdown' : 'time'].join(' ')
      }
      >
        {timeDetails.deliveryTime.map((time, index) => (
          <li
            className={
              ['list-group-item pointer',
                timing && activeTime === index ? 'active-time'
                  : `${timeChanged ? 'active-time' : 'time-display'}`
              ].join(' ')
            }
            onClick={() => handleClick(index)}
            aria-pressed="false"
            tabIndex="0"
            role="button"
          >
            <span>{time}</span>
            {!timeChanged && <DoubledChevron />}
          </li>
        ))}
      </ul>
      <Demarcation />
    </section>
  );
};

export default Time;
