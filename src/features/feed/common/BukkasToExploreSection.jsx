import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Carousel from 'Components/Carousel/Carousel';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';
import bukkaData from './bukkaData.json';

const renameCategory = name => (
  name.toLowerCase() === 'new' ?
    'New on Bukka' : name
);

const BukkasToExploreSection = ({
  partners,
  catelogs,
  mode,
  displayMap,
}) => {
  const { push } = useHistory();

  return (
    !displayMap &&
    <Fragment>
      <div className="carousel-divider" />
      <div className="pt-0 p-sm-3" />
      {mode === 'delivery' &&
      <Carousel
        container="container-padding"
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
      />}

      {/* Partners */}
      <div className="carousel-divider" />
      {(partners && partners.length > 0) && partners.map(partner => (
        partner.category.length > 0 ?
          <Fragment key={`promo-${partner.name}-${partner._id}`}>
            <Carousel
              container="container-padding"
              delivery
              noOfImagesShown={3}
              xl={3}
              lg={2}
              md={2}
              sm={1}
              push={push}
              placeId={partner._id}
              description={partner.description}
              numberOfViews={partner.numItems}
              title={renameCategory(partner.name)}
              slideItems={partner.category}
              controlClassNames="custom-mt-minus22"
              imageHeight="img-fluid"
              classNames="col-xl-4 col-md-6 col-sm-11 col-11"
            />
            <div className="carousel-divider" />
          </Fragment> : null
      ))}

      {/* TOp Categories */}
      {(catelogs && catelogs.length > 0) &&
      <Fragment>
        <Carousel
          container="container-padding"
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
          slideItems={catelogs}
          classNames="col-lg-3 col-md-3 col-sm-5 col-5 touchdown"
        />
        <div className="carousel-divider" />
      </Fragment>}

    </Fragment>
  );
};

const mapStateToProps = ({
  promotionReducer: { fetchedBukkas: partners },
  businessGroupReducer: { fetchedBukkas: catelogs },
  deliveryModeReducer: { mode },
}) => ({
  catelogs,
  partners,
  mode,
});

export default connect(mapStateToProps)(BukkasToExploreSection);

BukkasToExploreSection.propTypes = {
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
