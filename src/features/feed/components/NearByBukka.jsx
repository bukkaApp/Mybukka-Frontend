import React from 'react';

import shortId from 'shortid';

import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import PropTypes from 'prop-types';

const NearByBukka = ({
  bukkaData,
  title,
  classNames,
  imageHeight,
  children,
}) => (
  <div className="mt-4 mb-4 responsive-px-15">
    {title && <Headline title={title} activeIndex={1} />}
    {children}
    <div className="row pb-4 ml-1">
      {bukkaData.map(bukka => (
        <BukkaCard
          key={shortId.generate()}
          imageUrl={bukka.imageUrl}
          deliveryCost={bukka.deliveryCost}
          deliveryTime={bukka.deliveryTime}
          rating={bukka.rating}
          imageHeight={imageHeight}
          classNames={classNames}
        />
      ))}
    </div>
  </div>
);

export default NearByBukka;

NearByBukka.defaultProps = {
  children: '',
  heading: true,
  title: '',
};

NearByBukka.propTypes = {
  heading: PropTypes.bool,
  title: PropTypes.string,
  classNames: PropTypes.string.isRequired,
  imageHeight: PropTypes.string.isRequired,
  bukkaData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      deliveryCost: PropTypes.number,
      deliveryTime: PropTypes.string,
      rating: PropTypes.string
    })
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
