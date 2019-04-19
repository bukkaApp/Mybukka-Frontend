import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import addToCartAction from 'Redux/addToCartAction';
import Container from 'Components/container';
import Button from 'Components/button/Button';
import Chevron from 'Components/icons/ChevronRight';
import SuggestedItemPane from '../common/suggestedPane';

import './suggestedItems.scss';

const ChevronRight = ({ handleClick }) => (
  <Button
    type="button"
    handleClick={handleClick}
    classNames="right btn-chevron"
  >
    <Chevron />
  </Button>
);

const ChevronLeft = ({ handleClick }) => (
  <Button type="button" handleClick={handleClick} classNames="left btn-chevron">
    <Chevron />
  </Button>
);

const SuggestedItemsWrapper = ({ bukkaMenu, addToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // max-width = 75% multiply by number of index
  const maxWidth = 75;
  const slidesLength = bukkaMenu.length - 1;
  const translate = activeIndex >= 1 ? maxWidth : 0;

  const goToPrevSlide = (e) => {
    let index = activeIndex;
    e.preventDefault();

    if (activeIndex > 0) {
      index -= 1;
    }
    setActiveIndex(index);
  };

  const goToNextSlide = (e) => {
    let index = activeIndex;
    e.preventDefault();

    if (activeIndex === 0) {
      index = 1;
    } else {
      index += activeIndex === slidesLength ? 0 : 1;
    }

    setActiveIndex(index);
  };

  return (
    <Container classNames="suggested-items-section bg-gutter">
      <div
        className="d-flex
        justify-content-between align-items-center text-center"
      >
        <h4 className="font-size-14">Suggested Items</h4>
        {slidesLength >= 1 && (
          <div className="suggested-items-tray">
            <ChevronLeft handleClick={goToPrevSlide} />
            <ChevronRight handleClick={goToNextSlide} />
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <div
          style={{ transform: `translateX(${activeIndex * -translate}%)` }}
          className="d-flex flex-start overflow-visible suggested-items-pane-section"
        >
          {bukkaMenu.map(suggestedItem => (
            <SuggestedItemPane
              name={suggestedItem.title}
              key={suggestedItem.slug}
              price={suggestedItem.price}
              handleClick={() => addToCart(suggestedItem.slug)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ fetchBukkaMenuReducer: { bukkaMenu } }) => ({
  bukkaMenu: bukkaMenu.slice(0, 7)
});

export default connect(
  mapStateToProps,
  { addToCart: addToCartAction }
)(SuggestedItemsWrapper);

ChevronLeft.propTypes = {
  handleClick: PropTypes.func.isRequired
};

ChevronRight.propTypes = {
  handleClick: PropTypes.func.isRequired
};
