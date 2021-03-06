/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Container from 'Components/container';

import Chevron from 'Components/icons/ChevronRight';
import './scheduleSelector.scss';
import Demarcation from './SmallScreenDivider';
import TemporaryWrapper from '../../../components/ViewWrappers/TemporaryWrapper';

const styles = {
  maxHeight: '200px',
  height: '100%',
  overflowY: 'scroll',
  marginTop: 0,
};

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

const Schedule = ({ handleClick, item, isFocus, active }) => (
  <div
    className={`list-group-item pointer ${active ? 'active-time' : 'time-display'}`}
    onClick={() => handleClick(item)}
    aria-pressed="false"
    tabIndex="0"
    role="button"
  >
    <span>{item}</span>
    {!isFocus && <DoubledChevron />}
  </div>
);

const ScheduleSelector = React.forwardRef(({
  isFocus,
  active,
  title,
  type, list, handleChange,
}, ref) => {
  const [input, setInput] = useState('');

  const handleClick = (item) => {
    setInput(item);
    handleChange({ target: { name: type, value: item } });
  };

  return (
    <section ref={ref} className="mb-2 mt-4">
      <Demarcation />
      <Container classNames="p-lg-0">
        <TemporaryWrapper.ViewHeading noPadding text={title} classNames="pb-2" />
        <Schedule handleClick={handleClick} item={input || active} isFocus={isFocus} />
        {isFocus &&
        <div style={styles} className={`list-group time-list ${isFocus ? 'time-dropdown' : 'time'}`}>
          {list.map(listItem => (
            listItem === input ? null
              : <Schedule
                key={`non-schedule-selector-active-list-${listItem}-${type}`}
                handleClick={handleClick}
                item={listItem}
                isFocus={isFocus}
              />
          ))}
        </div>
        }
      </Container>
    </section>
  );
});

export default ScheduleSelector;
