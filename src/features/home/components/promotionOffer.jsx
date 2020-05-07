/** @format */

import React from "react";
import "./promotionOffer.scss";

const SmallTextSection = () => (
  <div className="offer-description container">
    <h6>Have access to unlimited promotion offers</h6>
    <p>
      With Postmates Unlimited, you get free delivery on every order, with no
      blitz pricing; plus access to exclusive offers, giveaways, concerts, and
      events.
    </p>
  </div>
);

const PromotionOffer = () => (
  <div className=" promotion-offer-section pb-4">
    <SmallTextSection />
  </div>
);

export default PromotionOffer;
