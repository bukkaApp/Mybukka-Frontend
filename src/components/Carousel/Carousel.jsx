import React, { Fragment, useState, useLayoutEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import fetchBukkaAction from 'Redux/fetchBukkaAction';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import Container from 'Components/container/Container';
import ChevronRight from 'Icons/ChevronRight';
import PropTypes, { any } from 'prop-types';
import FoodCard from './BukkaCard';
import Headline from './Headline';

import './Carousel.scss';

const numImagesToDisplay = (width, xl, lg, md, sm) => {
  if (width >= 1200) {
    return xl || xl;
  } else if (width >= 992 && width < 1200) {
    return lg || xl;
  } else if (width >= 767 && width < 992) {
    return md || lg || xl;
  } else if (width >= 576 && width < 767) {
    return sm || md || lg || xl;
  }
};

/**
 * @function useWindowSize
 * @returns {js} size
 */
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    /**
    * @function updateSize
    * @returns {js} cleanup func
    */
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

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
  xl, lg, md, sm,
  title,
  slideItems,
  carouselType,
  delivery,
  controlClassNames,
  textPositionBottom,
  type,
  numberOfViews,
  description,
  placeId,
  fetchBukka, fetchBukkaMenu, otherBukka
}) => {
  const { push } = useHistory();
  const [width, height] = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(0);

  const maxWidth = 100;
  const slidesLenght = slideItems.length;
  const translate = activeIndex >= 1 ? maxWidth / numImagesToDisplay(width, xl, lg, md, sm) : 0;
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

  const handleClick = (event, bukka) => {
    event.preventDefault();
    fetchBukkaMenu(`${bukka.slug}`)
      .then(() => fetchBukka(bukka.slug))
      .then(() => push(`/bukka/${bukka.slug}`));
  };

  return (
    <Fragment>
      {title && (
        <Headline
          activeIndex={activeIndex}
          title={title}
          description={description}
          slidesLength={slidesLenght}
          itemSizes={numImagesToDisplay(width, xl, lg, md, sm)}
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
                    key={`carousel-${bukka.title}-${bukka.name}-${bukka.slug}`}
                    other={otherBukka}
                    remark={bukka.placeGroup && bukka.placeGroup.length > 0 ?
                      bukka.placeGroup[0] : bukka.remark}
                    mealName={bukka.name || bukka.title}
                    deliveryCost={bukka.deliveryCost}
                    deliveryTime={bukka.deliveryTime}
                    delivery={delivery}
                    rating={bukka.rating}
                    textOverlay={textOverlay}
                    carouselType={carouselType}
                    heading={bukka.heading || bukka.name}
                    subHeading={bukka.subHeading}
                    top={bukka.position ? bukka.position.top : undefined}
                    bottom={textPositionBottom || undefined}
                    imageUrl={bukka.imageUrl}
                    deliveryPrice={bukka.deliveryPrice}
                    tags={bukka.tags && bukka.tags.length > 0 ? bukka.tags : bukka.placeGroup}
                    slug={bukka.slug}
                    handleClick={e => handleClick(e, bukka)}
                    classNames={`${classNames}`}
                    href={type === 'majorCuisine' ?
                      `/categories/${bukka.name}`
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

export default connect(
  () => ({}),
  {
    fetchBukkaMenu: fetchBukkaMenuAction,
    fetchBukka: fetchBukkaAction
  }
)(Carousel);

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
  push: () => {},
  title: '',
  handleRefFocus: () => {},
  delivery: false,
  xl: null,
  lg: null,
  md: null,
  sm: null,
  carouselType: '',
};

Carousel.propTypes = {
  controlClassNames: PropTypes.string,
  delivery: PropTypes.bool,
  classNames: PropTypes.string.isRequired,
  slideItems: PropTypes.arrayOf(any).isRequired,
  title: PropTypes.string,
  noOfImagesShown: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  carouselType: PropTypes.string,
  textOverlay: PropTypes.bool,
  xl: PropTypes.number,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
};
