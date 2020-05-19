import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import setDeliverySchedule from 'Redux/setDeliverySchedule';
import { scheduleData } from 'Components/common-navs/Duration';


import ScheduleSelector from '../common/ScheduleSelector';

const Schedules = ({ schedule, setSchedule }) => {
  const [activeSelector, _setActiveSelector] = useState('time');
  const [isFocus, _setFocus] = useState({ day: false, time: false });
  const titles = { day: 'Day', time: 'Time' };

  const _refs = {
    day: React.createRef(),
    time: React.createRef(),
  };

  const _emitOnChange = (e) => {
    const name = e.target.name;
    const activeFocusState = isFocus[name];
    _setFocus({ [name]: !activeFocusState });
    _setActiveSelector(name);
    setSchedule({ ...schedule, [name]: e.target.value });
  };

  const handleClickOutside = (event) => {
    const wrapperRef = _refs[activeSelector];
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      _setFocus({ [activeSelector]: false });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [_refs[activeSelector]]);

  return (
    scheduleData.map(eachSchedule => (
      <ScheduleSelector
        isFocus={isFocus[eachSchedule.selector]}
        key={titles[eachSchedule.selector]}
        ref={_refs[eachSchedule.selector]}
        active={eachSchedule.time}
        title={titles[eachSchedule.selector]}
        type={eachSchedule.selector}
        list={eachSchedule.options}
        handleChange={_emitOnChange}
      />))
  );
};

const mapStateToProps = ({ deliveryScheduleReducer: { schedule } }) => ({
  schedule
});

export default connect(
  mapStateToProps,
  { setSchedule: setDeliverySchedule }
)(Schedules);
