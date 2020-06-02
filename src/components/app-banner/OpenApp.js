import React from 'react';
// import { useHistory } from 'react-router-dom';

import bukkLogo from '../../assets/bukka_logo.png';

const OpenApp = () =>
//   const { location, push } = useHistory();

// add redirect on image click
// const RedirectToWeStore = () => {
//   push(location.pathname);
// };

  (
    <div className="workarea">
      <div id="logo" className="logo">
        <img src={bukkLogo} alt="bukkalogo" style={{ width: '200px', height: '200px', borderRadius: '20px' }} />
      </div>
      <span>Bukka - Food Delivery</span>
      <div className="app">
        <img alt="app store" src="https://cdn.appsflyer.com/af-statics/images/rta/app_store_badge.png" />
      </div>
    </div>
  )
;
export default OpenApp;
