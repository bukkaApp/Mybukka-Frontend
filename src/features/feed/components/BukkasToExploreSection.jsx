import React, { Fragment } from 'react';

// import PropTypes from 'prop-types';
import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';

import Carousel from 'Components/Carousel/Carousel';
import BukkaCard from 'Components/Carousel/BukkaCard';
import Headline from 'Components/Carousel/Headline';

import bukkaData from '../data/bukkaData.json';
import topCategories from '../data/cuisine.json';
import favorites from '../data/favorites.json';
import freeDelivery from '../data/free-delivery.json';

const BukkasToExploreSection = () => (
  <Fragment>
    <div className="carousel-divider" />
    <Carousel
      noOfImagesShown={2}
      title="New on Bukka"
      textOverlay
      top
      slideItems={bukkaData}
      imageHeight="img-big-height"
      classNames="col-lg-6 col-md-6 col-sm-12 col-12"
    />
    <div className="carousel-divider" />
    <Container classNames="px-15">
      <Headline title="Salty & Sweet" activeIndex={1} />
      <Row classNames="pb-4 ml-1">
        <BukkaCard
          imageUrl={favorites[4].imageUrl}
          deliveryCost={favorites[4].deliveryCost}
          deliveryTime={favorites[4].deliveryTime}
          rating={favorites[4].rating}
          imageHeight="img-height"
          classNames="col-lg-4 col-md-6 col-sm-12"
        />
      </Row>
    </Container>
    <div className="carousel-divider" />
    <Carousel
      noOfImagesShown={3}
      title="$1.99 Delivery"
      slideItems={freeDelivery}
      controlClassNames="custom-mt-minus22"
      imageHeight="img-height"
      classNames="col-lg-4 col-md-4 col-sm-12 col-12"
    />
    <div className="carousel-divider" />
    <Carousel
      noOfImagesShown={3}
      title="Bukkas favorites"
      controlClassNames="custom-mt-minus22"
      slideItems={favorites}
      imageHeight="img-height"
      classNames="col-lg-4 col-md-4 col-sm-12 col-12"
    />
    <div className="carousel-divider" />
    <Carousel
      noOfImagesShown={3}
      title="Free Delivery from The Habit 🍔"
      slideItems={freeDelivery}
      controlClassNames="custom-mt-minus22"
      imageHeight="img-height"
      classNames="col-lg-4 col-md-4 col-sm-12 col-12"
    />
    <div className="carousel-divider" />
    <Carousel
      noOfImagesShown={4}
      title="Touchdown"
      controlClassNames="custom-mt-touchdown"
      imageHeight="small-img-height"
      slideItems={favorites}
      classNames="col-lg-3 col-md-4 col-sm-12 col-12 touchdown"
    />
    <div className="carousel-divider" />
    <Carousel
      noOfImagesShown={6}
      textOverlay
      title="Top Categories"
      imageHeight="img-height"
      slideItems={topCategories}
      classNames="col-lg-2 col-md-2 col-sm-4 col-6 touchdown"
    />
  </Fragment>
);

export default BukkasToExploreSection;

BukkasToExploreSection.propTypes = {};