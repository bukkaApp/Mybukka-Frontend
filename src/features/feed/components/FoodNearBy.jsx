import React from 'react';

import shortId from 'shortid';

import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import PropTypes from 'prop-types';

const FoodNearBy = ({
  delivery,
  bukkaData,
  title,
  classNames,
  imageHeight,
  children,
  handleRefFocus
}) => (
  <div className="mt-4 mb-4">
    {title && (
      <Headline handleRefFocus={handleRefFocus} title={title} activeIndex={1} />
    )}
    {children}
    <Container>
      {bukkaData.length > 0 && (
        <Row classNames="pb-4">
          {bukkaData.map(bukka => (
            <BukkaCard
              key={shortId.generate()}
              imageUrl={bukka.imageUrl}
              mealName={bukka.name}
              delivery={delivery}
              deliveryPrice={bukka.deliveryPrice}
              deliveryTime={bukka.deliveryPrice}
              rating={bukka.rating}
              imageHeight={imageHeight}
              classNames={classNames}
              href={`/bukka/${bukka.slug}`}
            />
          ))}
        </Row>
      )}
    </Container>
  </div>
);

export default FoodNearBy;

FoodNearBy.defaultProps = {
  children: '',
  heading: true,
  title: '',
  delivery: false,
  handleRefFocus: () => {}
};

FoodNearBy.propTypes = {
  delivery: PropTypes.bool,
  handleRefFocus: PropTypes.func,
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
