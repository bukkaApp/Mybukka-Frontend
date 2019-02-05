import React, { useState } from 'react';
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

/**
 * @function carousel
 * @param {*} param0
 * @example
 */

const Carousel =
({ textOverlay, classNames, noOfImagesShown, title, NumberOfViews, slideItems, imageHeight }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // max-width = 100% divide by no of images expected to show at the same time
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
    <div className="mt-4 mb-4">
      <Headline
        activeIndex={activeIndex}
        title={title}
        slidesLenght={slidesLenght}
        NumberOfViews={NumberOfViews}
      />
      <div className="carousel-container">
        {activeIndex >= 1 && <ControlLeft handleClick={goToPrevSlide} />}
        <div className="overflow-hidden">
          <div
            style={
              { transform: `translateX(${activeIndex * -translate}%)` }}
            className="d-flex pb-4 flex-nowrap"
          >
            { slideItems.map(bukka =>
              (<FoodCard
                image={bukka.image}
                deliveryCost={bukka.deliveryCost}
                deliveryTime={bukka.deliveryTime}
                rating={bukka.rating}
                classNames={`first-child-pl-0 ${classNames}`}
                textOverlay={textOverlay}
                imageHeight={imageHeight}
              />))}
          </div>
        </div>
        { activeIndex + Number(noOfImagesShown) !== slidesLenght
        && <ControlRight handleClick={goToNextSlide} />}
      </div>
    </div>
  );
};

export default Carousel;

ControlLeft.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

ControlRight.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

Carousel.propTypes = {
  classNames: PropTypes.string.isRequired,
  slideItems: PropTypes.arrayOf(any).isRequired,
  title: PropTypes.string.isRequired,
  NumberOfViews: PropTypes.number.isRequired,
  noOfImagesShown: PropTypes.string.isRequired,
  imageHeight: PropTypes.string.isRequired,
  textOverlay: PropTypes.bool.isRequired
};
