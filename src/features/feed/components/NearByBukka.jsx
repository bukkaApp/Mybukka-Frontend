import React from 'react';

import shortId from 'shortid';

import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import PropTypes from 'prop-types';

const NearByBukka = ({ bukkaData }) => (
  <div className="mt-4 mb-4">
    <Headline title="Nearby" activeIndex={1} />
    <div className="row pb-4 ml-1">
      {bukkaData.map(bukka => (
        <BukkaCard
          key={shortId.generate()}
          imageUrl={bukka.imageUrl}
          deliveryCost={bukka.deliveryCost}
          deliveryTime={bukka.deliveryTime}
          rating={bukka.rating}
          imageHeight="img-height"
          classNames="col-lg-4 col-md-4 col-sm-12"
        />
      ))}
    </div>
  </div>
);

export default NearByBukka;

NearByBukka.propTypes = {
  bukkaData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      deliveryCost: PropTypes.number,
      deliveryTime: PropTypes.string,
      rating: PropTypes.string
    })
  ).isRequired
};
