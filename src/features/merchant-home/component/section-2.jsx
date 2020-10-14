import React from 'react';

import './section-2.scss';
import SpanComp from './span-comp';

const SectionTwo = () => (
    <div className="section-cont">
        <div className="cont-head">
            <h3>Why Bukka ?</h3>
            <p>We help businesses like yours reach new customers in your neighborhoods and grow to become local favorites.</p>
        </div>
        <p className="ani"></p>

        <div className="cont-body">
            <SpanComp />
        </div>
    </div>
);

export default SectionTwo;