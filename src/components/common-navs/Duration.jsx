import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';

import Clock from '../icons/Clock';
import { ReusableButton, ReusableDropdown, ReusableWrapper }
  from './ReusableNavElements';
import inputData from './inputData/duration.json';
import './duration.scss';

// Note: duration timelist needs to be genuinely generated (durationList).

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

export const TimeLists = ({ lists, handleClick, classNames, maxHeight }) => (
  <div className={`custom-duration-dropdown ${classNames}`}>
    <div className={`custom-duration-dropdown-content ${maxHeight}`}>
      {lists.map(time => (
        <div
          key={time}
          tabIndex="0"
          role="button"
          aria-pressed="false"
          onClick={() => handleClick(time)}
          className="custom-duration-dropdown-item"
        >
          <span>{time}</span>
        </div>
      ))}
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
            <div
              className="font-size-text"
              tabIndex="0"
              role="button"
              aria-pressed="false"
              onClick={() => setDropdown(!dropdown)}
            >
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

const Asap = ({ handleClick }) =>
  asapTime.map(text => (
    <div className="border-bottom" key={text}>
      <div className="position-relative">
        <div>
          <div className="font-size-16">
            <div
              className="font-size-text"
              tabIndex="0"
              role="button"
              aria-pressed="false"
              onClick={() => handleClick(text)}
            >
              <span>{text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

export const DurationContent = () => {
  const [activeOption, setOption] = useState(false);
  const [scheduled, reSchedule] = useState({
    day: 'Today',
    time: '7:00 AM - 7:30 AM',
  });

  const [asap, setAsap] = useState('');

  const handleDeliveryTime = (name, value) => {
    reSchedule({
      ...scheduled,
      [name]: value
    });
    console.log(asap);
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
          {!activeOption &&
          <Asap handleClick={setAsap} />
          }
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
        <button className="duration-dropdown-footer-button">
          <span>Set Delivery Time</span>
        </button>
      </div>
    </div>
  );
};

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
      <DurationContent />
    </ReusableDropdown>
  </ReusableWrapper>
);

export default Duration;

Duration.propTypes = {
  focus: PropTypes.bool.isRequired
};

TimeLists.defaultProps = {
  classNames: '',
  maxHeight: '',
};

TimeLists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])).isRequired,
  handleClick: PropTypes.func.isRequired,
  classNames: PropTypes.string,
  maxHeight: PropTypes.string,
};

Schedule.propTypes = {
  lists: PropTypes.arrayOf([PropTypes.string]).isRequired,
  handleClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
