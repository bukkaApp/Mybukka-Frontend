import React from 'react';
import BusinessSchedule from '../business-schedule';
import Map from '../map';
import './index.scss';

const BusinessAddress = ({ show, schedule, activeSchedule, location }) => {
  const locations = [{
    text: "Obanta's Bakery",
    labelOrigin: { x: 85, y: 14 },
    location: { lat: location[0], lng: location[1] }
  }];

  return (
    <div className={`${show ? 'Business-Address--active' : 'Business-Adress'}`}>
      <div className="Business-Address--underline" />
      <div className="Business-Address-Wrapper">
        <BusinessSchedule activeSchedule={activeSchedule} schedule={schedule} />
        {/* map address */}
        <div className="Business-Address-Map">
          <div className="Business-Address-Map-Content">
            <Map location={locations} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BusinessAddress;
