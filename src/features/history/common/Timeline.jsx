import React from 'react';
import PropTypes from 'prop-types';
// import Column from 'Components/grid/Column';
import './timeline.scss';

const Timeline = ({ time, status, icon, classNames }) => (
  <div className="timeline">
    <div className={`timeline-container timeline-left ${classNames}`}>
      <div className="timeline-content">
        <h5 className="font-size-14 suggested-item-price pt-2">{time}</h5>
        <h5 className="font-size-14 suggested-item-price pb-3">
          {status} {icon || <i>&#9992;...</i>}
        </h5>
      </div>
    </div>
  </div>
);

export default Timeline;

Timeline.defaultProps = {
  icon: '',
  classNames: '',
};

Timeline.propTypes = {
  icon: PropTypes.string,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};
