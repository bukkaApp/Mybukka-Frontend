import React from 'react';


import Help from '../img/help.svg';
import Desktop from '../img/desktop.svg';
import Connection from '../img/connection.svg';
import Cart from '../img/cart.svg';

import './span-comp.scss';

const SpanComp = () => (
    <div className="spread">
        <div className="body-desc">
            <span className="desc-cover"> <img src={Connection} alt="Connection" className="shrink" /> </span>
            <h5>Seamless Connections</h5>
            <p>We help businesses like yours reach new customers in your neighborhoods and grow to become local favorites.</p>
        </div>
        <div className="body-desc">
            <span className="desc-cover"> <img src={Desktop} alt="Desktop" className="shrink" /> </span>
            <h5>Digital Presence</h5>
            <p>We help businesses like yours reach new customers in your neighborhoods and grow to become local favorites.</p>
        </div>
        <div className="body-desc">
            <span className="desc-cover"> <img src={Cart} alt="Cart" className="shrink" /> </span>
            <h5>Increasing Orders</h5>
            <p>We help businesses like yours reach new customers in your neighborhoods and grow to become local favorites.</p>
        </div>
        <div className="body-desc">
            <span className="desc-cover"> <img src={Help} alt="Help" className="shrink" /> </span>
            <h5>Online Help</h5>
            <p>We help businesses like yours reach new customers in your neighborhoods and grow to become local favorites.</p>
        </div>
    </div>
);

export default SpanComp;