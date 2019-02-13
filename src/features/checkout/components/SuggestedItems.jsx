import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/button/Button';
import Chevron from 'Components/icons/ChevronRight';
import SuggestedItemPane from '../common/suggestedPane';
import itemDetails from '../InputAttribute/inputData.json';
import './suggestedItems.scss';

const ChevronRight = ({ handleClick }) => (
  <Button
    text={<Chevron />}
    type="button"
    handleClick={handleClick}
    classNames="mb-1 btn btn-link bg-white p-0 ml-4"
  />
);

const ChevronLeft = ({ handleClick }) => (
  <Button
    type="button"
    text={<Chevron />}
    handleClick={handleClick}
    classNames="left btn btn-link bg-white p-0 mr-4"
  />
);

const SuggestedItemsWrapper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [suggestItem, setSuggestItems] = useState(itemDetails.suggestedItems);

  const AddItemHandler = (index) => {
    const trayItem = [...suggestItem];
    // add item to tray | shopping basket
    const addItem = trayItem.slice(index);
    itemDetails.suggestedTray.push(addItem);
    // reduce | remove item from suggested items
    trayItem.splice(index, 1);
    setSuggestItems(trayItem);
  };

  // max-width = 75% multiply by number of index
  const maxWidth = 75;
  const slidesLength = suggestItem.length - 1;
  const translate = activeIndex >= 1 ? maxWidth : 0;

  const goToPrevSlide = (e) => {
    let index = activeIndex;
    e.preventDefault();

    index -= 1;
    setActiveIndex(index);
  };

  const goToNextSlide = (e) => {
    let index = activeIndex;
    e.preventDefault();

    index += activeIndex === slidesLength ? 0 : 1;
    setActiveIndex(index);
  };

  return (
    <div className="px-lg-4 bg-gutter mt-2">
      <div
        className="d-flex
        justify-content-between align-items-center text-center"
      >
        <h4 className="font-size-14">Suggested Items</h4>
        {slidesLength >= 1 &&
        <div className="mr-5">
          <ChevronLeft handleClick={goToPrevSlide} />
          <ChevronRight handleClick={goToNextSlide} />
        </div>
        }
      </div>

      <div className="overflow-hidden">
        <div
          style={
            { transform: `translateX(${activeIndex * -translate}%)` }
          }
          className="d-flex flex-start overflow-visible"
        >
          {suggestItem.map((suggestedItem, index) => (
            <SuggestedItemPane
              name={suggestedItem.name}
              key={suggestedItem.name}
              price={suggestedItem.price}
              handleClick={() => AddItemHandler(index)}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default SuggestedItemsWrapper;

ChevronLeft.propTypes = {
  handleClick: PropTypes.func.isRequired
};

ChevronRight.propTypes = {
  handleClick: PropTypes.func.isRequired
};
