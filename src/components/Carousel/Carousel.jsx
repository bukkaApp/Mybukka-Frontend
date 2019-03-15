import React, { useState } from 'react';

import shortId from 'shortid';

import ChevronRight from 'Icons/ChevronRight';
import PropTypes, { any } from 'prop-types';
import FoodCard from './BukkaCard';
import Headline from './Headline';

import './Carousel.scss';

const ControlLeft = ({ handleClick }) => (
  <div
    aria-pressed="false"
    tabIndex="0"
    role="button"
    onClick={handleClick}
    className="d-sm-none d-md-block control-left"
  >
    <ChevronRight />
  </div>
);

const ControlRight = ({ handleClick }) => (
  <div
    aria-pressed="false"
    tabIndex="0"
    role="button"
    onClick={handleClick}
    className="d-sm-none d-md-block control-right"
  >
    <ChevronRight />
  </div>
);

const Carousel = ({
  textOverlay,
  classNames,
  noOfImagesShown,
  title,
  slideItems,
  imageHeight,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const maxWidth = 100;
  const slidesLenght = slideItems.length;
  const translate = activeIndex >= 1 ? maxWidth / noOfImagesShown : 0;

  const goToPrevSlide = (e) => {
    let index = activeIndex;
    e.preventDefault();

    index -= 1;
    setActiveIndex(index);
  };

  const goToNextSlide = (e) => {
    let index = activeIndex;
    e.preventDefault();

    index += 1;
    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-divider" />
      <Headline
        activeIndex={activeIndex}
        title={title}
        slidesLenght={slidesLenght}
        NumberOfViews={slidesLenght}
      />
      <div className="carousel-container pr-1 pl-1">
        {activeIndex >= 1 && <ControlLeft handleClick={goToPrevSlide} />}
        <div className="overflow-hidden">
          <div
            style={{ transform: `translateX(${activeIndex * -translate}%)` }}
            className="d-flex flex-nowrap"
          >
            {slideItems.map(bukka => (
              <FoodCard
                key={shortId.generate()}
                imageUrl={bukka.imageUrl}
                deliveryCost={bukka.deliveryCost}
                deliveryTime={bukka.deliveryTime}
                rating={bukka.rating}
                classNames={`${classNames}`}
                textOverlay={textOverlay}
                imageHeight={imageHeight}
              />
            ))}
          </div>
        </div>
        {activeIndex + Number(noOfImagesShown) !== slidesLenght && (
          <ControlRight handleClick={goToNextSlide} />
        )}
      </div>
    </div>
  );
};

export default Carousel;

ControlLeft.propTypes = {
  handleClick: PropTypes.func.isRequired
};

ControlRight.propTypes = {
  handleClick: PropTypes.func.isRequired
};

Carousel.defaultProps = {
  textOverlay: false
};

Carousel.propTypes = {
  classNames: PropTypes.string.isRequired,
  slideItems: PropTypes.arrayOf(any).isRequired,
  title: PropTypes.string.isRequired,
  noOfImagesShown: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  imageHeight: PropTypes.string.isRequired,
  textOverlay: PropTypes.bool
};
