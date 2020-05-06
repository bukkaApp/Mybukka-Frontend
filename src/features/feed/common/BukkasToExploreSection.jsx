import React, { Fragment } from 'react';

import Carousel from 'Components/Carousel/Carousel';

import bukkaData from './bukkaData.json';

const renameCategory = name => (
  name.toLowerCase() === 'new' ?
    'New on Bukka' : name
);

const BukkasToExploreSection = ({ push, promotedBukkas, fetchedCuisines }) => (
  <Fragment>
    <div className="carousel-divider" />
    <div className="pt-0 p-sm-3" />
    <Carousel
      noOfImagesShown={2}
      xl={2}
      title="Featured"
      carouselType="collection"
      textOverlay
      top
      push={push}
      slideItems={bukkaData}
      imageHeight="img-fluid"
      classNames="col-lg-6 col-md-6 col-sm-11 col-11"
    />
    <div className="carousel-divider" />
    {
      (promotedBukkas && promotedBukkas.length > 0) &&
      promotedBukkas.map(promoBukkas => (
        promoBukkas.category.length > 0 ?
          <Fragment key={`promo${promoBukkas._id}`}>
            <Carousel
              delivery
              noOfImagesShown={3}
              xl={3}
              lg={2}
              md={2}
              sm={1}
              push={push}
              placeId={promoBukkas._id}
              description={promoBukkas.description}
              numberOfViews={promoBukkas.numItems}
              title={renameCategory(promoBukkas.name)}
              slideItems={promoBukkas.category}
              controlClassNames="custom-mt-minus22"
              imageHeight="img-fluid"
              classNames="col-xl-4 col-md-6 col-sm-11 col-11"
            />
            <div className="carousel-divider" />
          </Fragment> : null
      ))
    }
    {(fetchedCuisines && fetchedCuisines.length > 0) &&
    <Fragment>
      <Carousel
        type="majorCuisine"
        noOfImagesShown={5}
        xl={5}
        lg={4}
        md={4}
        sm={2}
        textOverlay
        push={push}
        carouselType="cuisine"
        textPositionBottom
        title="Top Categories"
        imageHeight="img-fluid"
        slideItems={fetchedCuisines}
        classNames="col-lg-3 col-md-3 col-sm-5 col-5 touchdown"
      />
      <div className="carousel-divider" />
    </Fragment>
    }

  </Fragment>
);

export default BukkasToExploreSection;

BukkasToExploreSection.propTypes = {};
