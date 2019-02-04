import React from 'react';
import LargeLocationNav from 'Components/common-navs/LocationNavLargeScreen';
import BukkaCard from 'Components/Carousel/BukkaCard';
import Headline from 'Components/Carousel/Headline';
import Carousel from 'Components/Carousel/Carousel';

import foodJollof from '../images/food-Jollof.jpg';
import Pie from '../images/banner-img-2.jpg';
import chicken from '../images/banner-img-3.jpg';
import './feed.scss';


/**
 * @description All Meals component
 *
 * @class FeedPage
 *
 * @namespace Component
 *
 * @extends Component
 */
const FeedPage = () => {
  const BukkaData = [{
    deliveryTime: '30-50 min',
    author: 'Bane',
    deliveryCost: '#300',
    image: foodJollof,
    rating: 'popular'
  }, {
    deliveryTime: '1 hour',
    author: "Ra's Al Ghul",
    deliveryCost: '$400',
    image: Pie
  }, {
    deliveryTime: '40-50 min',
    author: 'Joker',
    deliveryCost: '#500',
    image: chicken,
    rating: 'popular'
  }, {
    deliveryTime: '1 hour',
    author: "Ra's Al Ghul",
    deliveryCost: '$400',
    image: Pie
  }];

  return (
    <div className="container-fluid p-0">
      <LargeLocationNav />

      <main className="main-container mx-auto col-lg-10 col-md-6 col-sm-6">
        <Carousel
          noOfImagesShown="2"
          title="New on Bukka"
          textOverlay
          slideItems={BukkaData}
          classNames="col-lg-6 col-md-6 col-sm-12"
        />

        <Carousel
          noOfImagesShown="3"
          title="$1.99 Delivery"
          slideItems={BukkaData}
          classNames="col-lg-4 col-md-4 col-sm-12"
          imageCount="3"
        />

        <div className="mt-4 mb-4">
          <Headline title="Salty & Sweet" activeIndex="1" />
          <div className="row pb-4">
            <BukkaCard
              image={BukkaData[0].image}
              deliveryCost={BukkaData[0].deliveryCost}
              deliveryTime={BukkaData[0].deliveryTime}
              rating={BukkaData[0].rating}
              classNames="col-lg-4 col-md-4 col-sm-12"
            />
          </div>
        </div>

        <Carousel
          noOfImagesShown="4"
          title="Touchdown"
          slideItems={BukkaData}
          classNames="col-lg-3 col-md-3 col-sm-12"
          imageCount="4"
        />
      </main>

    </div>
  );
};

export default FeedPage;
