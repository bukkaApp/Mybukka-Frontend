import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import updateCartAction from 'Redux/updateCartAction';
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

const SuggestedItemsWrapper = ({ bukkaMenuToSuggest, addToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // max-width = 75% multiply by number of index
  const maxWidth = 75;
  const slidesLength = bukkaMenuToSuggest.length - 1;
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
          {bukkaMenuToSuggest.map(suggestedItem => (
            <SuggestedItemPane
              name={suggestedItem.title}
              key={suggestedItem.slug}
              price={suggestedItem.price}
              handleClick={() => addToCart(suggestedItem, true)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ fetchBukkaMenuReducer: { bukkaMenu }, cartReducer: { items } }) => {
  const mealsInCart = items.map(item => item.slug);
  const bukkaMenuToSuggest = bukkaMenu.filter(menu => !mealsInCart.includes(menu.slug)).slice(0, 7);
  return { bukkaMenuToSuggest };
};

export default connect(
  mapStateToProps,
  { addToCart: updateCartAction }
)(SuggestedItemsWrapper);

ChevronLeft.propTypes = {
  handleClick: PropTypes.func.isRequired
};

ChevronRight.propTypes = {
  handleClick: PropTypes.func.isRequired
};
