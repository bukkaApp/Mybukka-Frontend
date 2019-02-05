import React from 'react';
// import { withRouter } from 'react-dom';
import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLargeScreen';
import LocationNavSmallScreen
  from 'Components/common-navs/LocationNavSmallScreen';
import BukkaCard from 'Components/Carousel/BukkaCard';
import Headline from 'Components/Carousel/Headline';
import Carousel from 'Components/Carousel/Carousel';

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
    image:
    'https://res.cloudinary.com/deqt3envc/image/upload/v1549300439/banner-img-3.jpg',
    rating: 'popular'
  }, {
    deliveryTime: '1 hour',
    author: "Ra's Al Ghul",
    deliveryCost: '$400',
    image:
    'https://res.cloudinary.com/deqt3envc/image/upload/v1549300440/banner-img-2.jpg'
  }, {
    deliveryTime: '40-50 min',
    author: 'Joker',
    deliveryCost: '#500',
    image:
    'https://res.cloudinary.com/deqt3envc/image/upload/v1549300439/food-Jollof.jpg',
    rating: 'popular'
  }, {
    deliveryTime: '1 hour',
    author: "Ra's Al Ghul",
    deliveryCost: '$400',
    image:
    'https://res.cloudinary.com/deqt3envc/image/upload/v1549300440/banner-img-2.jpg'
  }];

  return (
    <div className="container-fluid p-0">
      <div className="d-none sticky-nav-bar d-md-flex">
        <LocationNavLargeScreen />
      </div>
      <div className="d-sm-block sticky-nav-bar d-md-none d-lg-none d-xl-none">
        <LocationNavSmallScreen ref={span => console.log(span)} />
      </div>

      <div className="clear-sticky-position" />

      <main className="main-container mx-auto col-lg-10 col-md-12 col-sm-12">
        <Carousel
          noOfImagesShown="2"
          title="New on Bukka"
          textOverlay
          slideItems={BukkaData}
          imageHeight="img-big-height"
          classNames="col-lg-6 col-md-6 col-sm-12 col-12"
        />

        <Carousel
          noOfImagesShown="3"
          title="$1.99 Delivery"
          slideItems={BukkaData}
          imageHeight="img-height"
          classNames="col-lg-4 col-md-4 col-sm-12 col-12"
        />

        <div className="mt-4 mb-4">
          <Headline title="Salty & Sweet" activeIndex="1" />
          <div className="row pb-4">
            <BukkaCard
              image={BukkaData[0].image}
              deliveryCost={BukkaData[0].deliveryCost}
              deliveryTime={BukkaData[0].deliveryTime}
              rating={BukkaData[0].rating}
              imageHeight="img-height"
              classNames="col-lg-4 col-md-6 col-sm-12"
            />
          </div>
        </div>

        <Carousel
          noOfImagesShown="4"
          title="Touchdown"
          imageHeight="small-img-height"
          slideItems={BukkaData}
          classNames="col-lg-3 col-md-4 col-sm-12 col-12"
        />
      </main>

    </div>
  );
};

export default FeedPage;
