/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { connect } from 'react-redux';
import shortId from 'shortid';
import Container from 'Components/container';

import setDeliverySchedule from 'Redux/setDeliverySchedule';
import Chevron from 'Components/icons/ChevronRight';
import './time.scss';
import Demarcation from '../common/SmallScreenDivider';

const DoubledChevron = () => (
  <div className="d-flex flex-column p-0 doubled-chevron">
    <div className="rotate-up p-0">
      <Chevron />
    </div>
    <div className="rotate-down p-0">
      <Chevron />
    </div>
  </div>
);

const Schedule = ({ handleClick, item, timeChanged, active }) => (
  <li
    className={[
      'list-group-item pointer',
      active ? 'active-time' : 'time-display'
    ].join(' ')}
    onClick={() => handleClick(item)}
    aria-pressed="false"
    tabIndex="0"
  role="button" // eslint-disable-line
    key={shortId.generate()}
  >
    <span>{item}</span>
    {!timeChanged && <DoubledChevron />}
  </li>
);

const activeSchedule = (item, schedule) => item === schedule;

const ScheduleSelector = ({
  title,
  list,
  schedule,
  type,
  setDeliveryScheduleTime
}) => {
  const [timeChanged, setTimeChanged] = useState(false);

  const handleClick = (item) => {
    setTimeChanged(!timeChanged);
    setDeliveryScheduleTime({ ...schedule, [type]: item });
  };

  const nonActiveList = list.filter(item => item !== schedule[type]);
  const activeList = list.filter(item => item === schedule[type]);

  return (
    <section className="mb-2 mt-4">
      <Demarcation />
      <Container classNames="p-lg-0">
        <h2 className="font-size-16 px-3 px-md-3 px-lg-0">{title}</h2>
        <ul
          className={[
            'list-group time-list mt-4',
            timeChanged ? 'time-dropdown' : 'time'
          ].join(' ')}
        >
          <li
            className="time-list-wrapper"
            style={{ overflowY: timeChanged ? 'scroll' : 'hidden' }}
          >
            {
              activeList.map(item => (
                <Schedule
                  handleClick={handleClick}
                  item={item}
                  timeChanged={timeChanged}
                  active={activeSchedule(item, schedule[type])}
                />
              ))
            }
            {
              nonActiveList.map(item => (
                <Schedule
                  handleClick={handleClick}
                  item={item}
                  timeChanged={timeChanged}
                  active={activeSchedule(item, schedule[type])}
                />
              ))
            }
          </li>
        </ul>
      </Container>
    </section>
  );
};

const mapStateToProps = ({
  deliveryScheduleReducer: {
    schedule
  }
}) => ({
  schedule
});

export default connect(
  mapStateToProps,
  { setDeliveryScheduleTime: setDeliverySchedule }
)(ScheduleSelector);
