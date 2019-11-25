import React, { Fragment, useState } from 'react';

import shortId from 'shortid';
import { Link } from 'react-router-dom';

import Container from 'Components/container/Container';
import ChevronRight from 'Icons/ChevronRight';
import PropTypes, { any } from 'prop-types';
import FoodCard from './BukkaCard';
import Headline from './Headline';

import './Carousel.scss';

const ControlLeft = ({ handleClick, classNames }) => (
  <div
    aria-pressed="false"
    tabIndex="0"
    role="button"
    onClick={handleClick}
    className={`d-sm-none d-md-block control-left ${classNames}`}
  >
    <ChevronRight />
  </div>
);

const ControlRight = ({ handleClick, classNames }) => (
  <div
    aria-pressed="false"
    tabIndex="0"
    role="button"
    onClick={handleClick}
    className={`d-sm-none d-md-block control-right ${classNames}`}
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
  delivery,
  controlClassNames,
  type,
  numberOfViews,
  description,
  placeId,
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
    <Fragment>
      {title && (
        <Headline
          activeIndex={activeIndex}
          title={title}
          description={description}
          slidesLenght={slidesLenght}
          numberOfViews={numberOfViews}
          placeId={placeId}
        />
      )}
      <Container>
        <div className="carousel">
          <div className="carousel-container align-items-center">
            {activeIndex >= 1 && (
              <ControlLeft
                classNames={controlClassNames}
                handleClick={goToPrevSlide}
              />
            )}
            <div className="overflow-hidden">
              <div
                style={{
                  transform: `translateX(${activeIndex * -translate}%)`
                }}
                className="row custom-flex-nowrap"
              >
                {slideItems.map(bukka => (
                  <FoodCard
                    key={shortId.generate()}
                    remark={bukka.placeGroup && bukka.placeGroup.length > 0 ?
                      bukka.placeGroup[0] : bukka.remark}
                    mealName={bukka.name || bukka.title}
                    deliveryCost={bukka.deliveryCost}
                    deliveryTime={bukka.deliveryTime}
                    delivery={delivery}
                    rating={bukka.rating}
                    textOverlay={textOverlay}
                    imageHeight={imageHeight}
                    heading={bukka.heading}
                    subHeading={bukka.subHeading}
                    top={bukka.position ? bukka.position.top : undefined}
                    bottom={bukka.position ? bukka.position.bottom : undefined}
                    imageUrl={bukka.imageUrl}
                    deliveryPrice={bukka.deliveryPrice}
                    tags={bukka.tags && bukka.tags.length > 0 ? bukka.tags : bukka.placeGroup}
                    slug={bukka.slug}
                    classNames={`${classNames}`}
                    href={type === 'majorCuisine' ?
                      `/search?by=${type}&value=${bukka.id}`
                      : `/bukka/${bukka.slug}`}
                  />
                ))}
              </div>
            </div>
            {slidesLenght <= noOfImagesShown ||
              (activeIndex + Number(noOfImagesShown) !== slidesLenght && (
                <ControlRight
                  classNames={controlClassNames}
                  handleClick={goToNextSlide}
                />
              ))}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Carousel;

const defaultProps = {
  classNames: ''
};

ControlRight.defaultProps = defaultProps;

ControlLeft.defaultProps = defaultProps;

ControlLeft.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classNames: PropTypes.string
};

ControlRight.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classNames: PropTypes.string
};

Carousel.defaultProps = {
  textOverlay: false,
  controlClassNames: '',
  title: '',
  handleRefFocus: () => {},
  delivery: false
};

Carousel.propTypes = {
  controlClassNames: PropTypes.string,
  delivery: PropTypes.bool,
  classNames: PropTypes.string.isRequired,
  slideItems: PropTypes.arrayOf(any).isRequired,
  title: PropTypes.string,
  noOfImagesShown: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  imageHeight: PropTypes.string.isRequired,
  textOverlay: PropTypes.bool
};
