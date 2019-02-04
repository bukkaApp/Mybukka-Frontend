/* eslint-disable */
import React from 'react';
import MarkIcon from 'Components/icons/Remark';
import './BukkaCard.scss';

const TextOverlay = () => (
    <div className="overlay">
      <h4>Chipotle</h4>
      <h5>Order Now</h5>
    </div>
)

const NormalText = ({ deliveryCost, deliveryTime, rating }) => (
    <div className="details">
    <h3>
      <span className="details-location">
          San francisco
        <span>kitchen
          <span className="icon">
            <MarkIcon />
          </span>
        </span>
      </span>
      { rating && <span className="rating">{ rating }</span>}
    </h3>
    <div className="delivery">
      <span className="delivery-cost pr-2">{ deliveryCost } Delivery</span>
          ·
      <span className="pl-2">{ deliveryTime }</span>
    </div>
  </div>  
)

// Image = "img-height": "img-big-height"

const card = ({ image, deliveryCost, deliveryTime, rating, classNames, imageHeight, textOverlay }) => (
  <div className={['mt-4 mb-4 ', classNames].join(' ')}>
    <img className={imageHeight} src={image} alt="alt_image" />
    {textOverlay && <TextOverlay />}
    {!textOverlay && <NormalText
    deliveryCost={deliveryCost}
    deliveryTime={deliveryTime}
    rating={rating}
    />}
  </div>
);

export default card;

