import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import setDeliverySchedule from 'Redux/setDeliverySchedule';
import Lists from '../list/Lists';

import domData, { scheduleData } from '../../shared/schedule';

import './index.scss';

const ScheduleItem = ({ placeholder, handleClick, lists, name }) => {
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
        {dropdown && <Lists handleClick={selectTime} lists={lists} />}
      </div>
    </div>
  );
};

const { asapTime } = domData;

const Schedule = ({ mode, currentSchedule, setSchedule }) => {
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

  const asapJsx = asapTime.map(text => (
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
    </div>));

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
          {!activeOption && asapJsx}
          {activeOption &&
            scheduleData.map(schedule => (
              <ScheduleItem
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

export default connect(
  mapStateToProps,
  { setSchedule: setDeliverySchedule }
)(Schedule);

ScheduleItem.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
