import React from 'react';
import MapIntegration from './map-int';

import './section-3.scss';

const SectionThree = () => (
    <div className="begining">
        <MapIntegration />
        <div className="denver">
            <h3>Connect with new local customers.</h3>
            <p>Grow your sales and become a favorite by getting in front of more people at the exact moment they’re ready to buy. They come to us, we introduce them to you.</p>
            <div className="that-part">
                <p className="disp">500,000 +</p>
                <p className="excpt">daily searches</p>
            </div>
        </div>
    </div>
);

export default SectionThree;