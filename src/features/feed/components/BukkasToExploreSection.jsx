/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

// import PropTypes from 'prop-types';

import Carousel from 'Components/Carousel/Carousel';

import bukkaData from '../data/bukkaData.json';
import topCategories from '../data/cuisine.json';

const renameCategory = name => (
  name.toLowerCase() === 'new' ?
    'New on Bukka' : name
);

const BukkasToExploreSection = ({ promotedBukkas }) => (
  <Fragment>
    <div className="carousel-divider" />
    <div className="pt-0 p-sm-3" />
    <Carousel
      noOfImagesShown={2}
      title="Featured"
      textOverlay
      top
      slideItems={bukkaData}
      // imageHeight="img-big-height"
      imageHeight="img-fluid"
      classNames="col-lg-6 col-md-6 col-sm-12 col-12"
    />
    <div className="carousel-divider" />
    {
      promotedBukkas.length > 0 && promotedBukkas.map(promoBukkas => (
        promoBukkas.category.length > 0 ?
          <Fragment>
            <Carousel
              delivery
              noOfImagesShown={3}
              placeId={promoBukkas._id}
              description={promoBukkas.description}
              numberOfViews={promoBukkas.numItems}
              title={renameCategory(promoBukkas.name)}
              slideItems={promoBukkas.category}
              controlClassNames="custom-mt-minus22"
              imageHeight="img-fluid"
              classNames="col-lg-4 col-md-4 col-sm-12 col-12"
            />
            <div className="carousel-divider" />
          </Fragment> : null
      ))
    }
    <Carousel
      type="majorCuisine"
      noOfImagesShown={6}
      textOverlay
      title="Top Cuisines"
      // imageHeight="cuisine-img-height"
      imageHeight="img-fluid"
      slideItems={topCategories}
      classNames="col-lg-2 col-md-2 col-sm-4 col-6 touchdown"
    />
  </Fragment>
);

export default BukkasToExploreSection;

BukkasToExploreSection.propTypes = {};
