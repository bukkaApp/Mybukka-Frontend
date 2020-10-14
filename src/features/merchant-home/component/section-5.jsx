import React from 'react';

import './section-5.scss';

import TabDisplay from './phone-disp2';

const SectionFive = () => (
    <div className="final-sec">
        <TabDisplay className="tab-disp"/>
        <div className="fin-sec">
            <h5>Orders your way.</h5>
            <p>The power is yours with the option to tell us how you’d like to receive orders. Whether it’s through the phone, tablet, or your POS system, with us, you have options.</p>
            <div className="this-part">
                <span className="disp">100,000 +</span>
                <span className="excpt">daily orders made</span>
            </div>
        </div>
    </div>
);

export default SectionFive;