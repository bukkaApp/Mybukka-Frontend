/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navlink from 'Components/navlink/Navlink';
import Container from 'Components/container/Container';
import setPromotionToDisplayAction from 'Redux/setPromotionToDisplayAction';

import './Headline.scss';

// NumItemsToView - number of items to view
const NumItemsToView = ({ items, description, id, handleClick }) => (
  <Navlink
    classNames={`headline-link ${description ? 'd-sm-none' : ''}`}
    href={`/place-groups/d/${id}`}
    onClick={handleClick}
    rel="nofollow"
  >
    <span className="d-none pr-3 d-sm-inline-flex">
      View all {items}
    </span>
    <i className="fas fa-chevron-right" />
  </Navlink>
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
  useScroll,
  currentTitle,
  setCurrentTitle
}) => {
  const headline = useRef();
  const [state, setState] = useState(0);
  const [result, calc] = useState(0);

  // TODO: cleanup this function
  const updateSlideWidth = (width) => {
    let slideWidth = ((width || state) / (slidesLength - itemSizes)) * activeIndex;
    if (activeIndex === 1) {
      slideWidth = state / (slidesLength - itemSizes);
    } else if (activeIndex > 1) {
      slideWidth = (((width || state) / (slidesLength - itemSizes)) * activeIndex) - 32;
    }
    calc(slideWidth);
  };

  const _inViewport = () => {
    const imageTopPosition = headline.current.getBoundingClientRect().top;

    const buffer = 135;
    if (buffer > imageTopPosition) {
      return true;
    }
    return false;
  };

  const handleScroll = () => {
    if (headline.current && _inViewport() && title !== currentTitle) {
      setCurrentTitle(title);
    }
  };

  useEffect(() => {
    const width = headline ? headline.current.clientWidth : 0;
    setState(width);
    updateSlideWidth(width);

    if (useScroll) {
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
  }, [headline]);

  // TODO: Replace the api call with new API hook
  const handleClick = async () => {
    await setPromotionToDisplay(placeId, title, description);
  };

  const resolveValidId = () => title.replace(/ /g, '-').replace(/'/g, '-').replace(/₦/g, '-');

  // TODO: cleanup, find out if there is need for the effect
  useEffect(() => {
    updateSlideWidth();
  }, [activeIndex]);

  return (
    <Container>
      <div className="headline" id={resolveValidId()} ref={headline}>
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
