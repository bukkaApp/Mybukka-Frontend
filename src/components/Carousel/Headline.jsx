/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'Components/container/Container';
import setPromotionToDisplayAction from 'Redux/setPromotionToDisplayAction';

import './Headline.scss';

// NumItemsToView - number of items to view
const NumItemsToView = ({ items, description, id, handleClick }) => (
  <a
    className={`headline-link ${description ? 'd-sm-none' : ''}`}
    href={`/place-groups/d/${id}`}
    onClick={handleClick}
    rel="nofollow"
  >
    <span className="d-none pr-3 d-sm-inline-flex">
      View all {items}
    </span>
    <i className="fas fa-chevron-right" />
  </a>
);

const Headline = ({
  title,
  numberOfViews,
  slidesLength,
  activeIndex,
  description,
  placeId,
  setPromotionToDisplay,
  itemSizes,
}) => {
  const [state, setState] = useState(0);
  const [result, calc] = useState(0);
  const headline = useRef(null);

  const updateSlideWidth = (width) => {
    let slideWidth = ((width || state) / (slidesLength - itemSizes)) * activeIndex;
    if (activeIndex === 1) {
      slideWidth = state / (slidesLength - itemSizes);
    } else if (activeIndex > 1) {
      slideWidth = (((width || state) / (slidesLength - itemSizes)) * activeIndex) - 32;
    }
    calc(slideWidth);
  };

  useEffect(() => {
    const width = headline ? headline.current.clientWidth : 0;
    setState(width);
    updateSlideWidth(width);
  }, [headline]);

  const handleClick = async () => {
    await setPromotionToDisplay(placeId, title, description);
  };

  useEffect(() => {
    updateSlideWidth();
  }, [activeIndex]);

  return (
    <Container>
      <div className="headline" id={title} ref={headline}>
        <div
          className="runner h"
          style={{
            transform: `translateX(${result}px)`,
            opacity: 1
          }}
        />
        <div className="d-flex justify-content-between">
          <h2 className="headline-h2">{title}</h2>
          {numberOfViews > 10 &&
            <NumItemsToView
              items={numberOfViews}
              description={description}
              id={placeId}
              handleClick={handleClick}
            />
          }
        </div>
        {description &&
          <p className="d-flex justify-content-between">
            {description}
            <div className="d-none d-sm-inline-flex">
              {numberOfViews > 10 &&
              <NumItemsToView
                items={numberOfViews}
                id={placeId}
                handleClick={handleClick}
              />
              }
            </div>
          </p>
        }
      </div>
    </Container>
  );
};

export default connect(() => ({}), {
  setPromotionToDisplay: setPromotionToDisplayAction,
})(Headline);

Headline.defaultProps = {
  numberOfViews: null,
  slidesLength: 1,
};

Headline.propTypes = {
  numberOfViews: PropTypes.number,
  title: PropTypes.string.isRequired,
  slidesLength: PropTypes.number,
  activeIndex: PropTypes.number.isRequired,
};
