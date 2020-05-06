import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import setDeliverySchedule from 'Redux/setDeliverySchedule';

import Clock from '../icons/Clock';
import {
  ReusableButton,
  ReusableDropdown,
  ReusableWrapper
} from './ReusableNavElements';
import inputData from './inputData/duration';

import './duration.scss';


const { sheduleTimeLists, durationList, asapTime } = inputData;

const scheduleData = [
  {
    time: 'Today',
    selector: 'day',
    options: [...durationList]
  },
  {
    time: '1:00 - 1:30',
    selector: 'time',
    options: [...sheduleTimeLists]
  }
];

export const TimeLists = ({
  lists,
  handleClick,
  classNames,
  maxHeight,
  pathname,
  link
}) => (
  <div className={`custom-duration-dropdown ${classNames}`}>
    <div className={`custom-duration-dropdown-content ${maxHeight}`}>
      {lists.map(list => (
        link ? (
          <a href={`${pathname}#${list}`}>
            <div key={list} tabIndex="0" role="button" aria-pressed="false" className="custom-duration-dropdown-item">
              <span>{list}</span>
            </div>
          </a>
        ) : (
          <div key={list} tabIndex="0" role="button" aria-pressed="false" onClick={() => handleClick(list)} className="custom-duration-dropdown-item">
            <span>{list}</span>
          </div>
        )))}
    </div>
  </div>
);

const Schedule = ({ placeholder, handleClick, lists, name }) => {
  const [dropdown, setDropdown] = useState(false);

  const selectTime = (value) => {
    handleClick(name, value);
    setDropdown(false);
  };

  return (
    <div className="border-bottom cursor-pointer">
      <div className="position-relative">
        <div>
          <div className="font-size-16">
            <div className="font-size-text" tabIndex="0" role="button" aria-pressed="false" onClick={() => setDropdown(!dropdown)}>
              <span>{placeholder}</span>
            </div>
            <span className="custom-chevron-down" />
          </div>
        </div>
        {dropdown && <TimeLists handleClick={selectTime} lists={lists} />}
      </div>
    </div>
  );
};

const Asap = () =>
  asapTime.map(text => (
    <div className="border-bottom" key={text}>
      <div className="position-relative">
        <div>
          <div className="font-size-16">
            <div className="font-size-text" tabIndex="0" role="button" aria-pressed="false">
              <span>{text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

export const DurationContent = ({
  mode, setSchedule, currentSchedule
}) => {
  const [activeOption, setOption] = useState(mode === 'schedule');
  const [scheduled, reSchedule] = useState({ ...currentSchedule });

  useEffect(() => {
    const { time, day } = currentSchedule;
    reSchedule({ day, time });
  }, []);

  const handleDeliveryTime = (name, value) => {
    reSchedule({
      ...scheduled,
      [name]: value
    });
  };

  return (
    <div className="bg-white">
      <div className="duration-dropdown-header">
        <button
          onClick={() => setOption(false)}
          className={`duration-dropdown-button
          ${activeOption ? '' : 'active-duration-button'}`}
        >
          <span>ASAP</span>
        </button>
        <button
          onClick={() => setOption(true)}
          className={`duration-dropdown-button
          ${activeOption ? 'active-duration-button' : ''}`}
        >
          <span>Schedule</span>
        </button>
      </div>
      <div className="duration-dropdown-body">
        <div className="duration-dropdown-content">
          {!activeOption && <Asap />}
          {activeOption &&
            scheduleData.map(schedule => (
              <Schedule
                key={`${schedule.selector} hi`}
                placeholder={scheduled[schedule.selector]}
                lists={schedule.options}
                name={schedule.selector}
                handleClick={handleDeliveryTime}
              />
            ))}
        </div>
        <button
          className="duration-dropdown-footer-button"
          onClick={() => setSchedule(scheduled)}
        >
          <span>Set Delivery Time</span>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ deliveryScheduleReducer: { mode, schedule } }) => ({
  mode,
  currentSchedule: schedule
});

export const ConnectedDurationContent = connect(
  mapStateToProps,
  { setSchedule: setDeliverySchedule }
)(DurationContent);

const Duration = props => (
  <ReusableWrapper>
    <ReusableButton classNames="custom-duration" {...props}>
      <span
        className="current-location-button-icon mr-0
        custom-mt-minus1"
      >
        <Clock />
      </span>
      <div>
        <h2
          className={`current-location-button-text ml-1
          ${props.focus ? 'duration-h2-text-active' : 'duration-h2-text'}`}
        >
          Schedule for later
        </h2>
      </div>
    </ReusableButton>
    <ReusableDropdown classNames={`${props.focus ? '' : 'dropdown--disapear'}`}>
      <ConnectedDurationContent />
    </ReusableDropdown>
  </ReusableWrapper>
);

export default Duration;

Duration.propTypes = {
  focus: PropTypes.bool.isRequired
};

TimeLists.defaultProps = {
  classNames: '',
  maxHeight: ''
};

TimeLists.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  classNames: PropTypes.string,
  maxHeight: PropTypes.string
};

Schedule.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

DurationContent.propTypes = {
  mode: PropTypes.string.isRequired
};
