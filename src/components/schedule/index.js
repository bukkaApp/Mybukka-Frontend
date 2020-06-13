import React from 'react';

import Clock from '../icons/Clock';
import Schedule from './Schedule';

import {
  ReusableButton,
  ReusableDropdown,
  ReusableWrapper
} from '../common-navs/ReusableNavElements';

import './index.scss';


const ScheduleIndex = props => (
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
      <Schedule />
    </ReusableDropdown>
  </ReusableWrapper>
);

export default ScheduleIndex;
