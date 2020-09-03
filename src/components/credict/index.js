import React from 'react';

import './index.scss';

const Index = () => (
  <div className="Credict-component">
    <div className="Credict-Content">
      <div className="Credit-Header">
        <span>Promos and Credits</span>
      </div>
      <div className="Credict-Promo-Content">
        <div className="Credict-Promo-Content-Item">
          <input
            placeholder="Add a promo or gift code"
            className="Credict-Promo-Field"
            value=""
          />
          <button className="Credict-Promo-Button" disabled="">
            <span>Apply</span>
          </button>
        </div>
      </div>
      <div className="Promo-Section">
        <div className="Promo-Section-Header">
          <span>Promos</span>
        </div>
        <div className="Promo-Section-Content">
          <div className="Promo-Section-Item">₦2000 off Discount Fee</div>
          <div className="Promo-Section-Item--sibling">Expires 31/12/2019</div>
          <div className="Promo-Section-Footer">
            Welcome credit for joining
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Index;
