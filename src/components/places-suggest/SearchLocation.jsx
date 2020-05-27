/* eslint-disable react/prop-types */
import React, { useEffect, Fragment, createRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import MapMarker from 'Icons/MapMarker';
import ChevronRight from 'Icons/ChevronRight';
import Field from 'Components/input/Field';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import SuggestionsDropdown from './SuggestionsDropdown';

import './searchlocation.scss';
import useAutocompleteService from '../../hooks/useAutocompleteService';

const style = { border: '1 px solid #eceff1' };
const className = 'input-group address-input-section';

const SearchLocation = ({
  showDeliveryOrPickupNav,
  chevronButtonVisible,
  showDropdown,
  emitOnChange,
  standalone,
  name,
}) => {
  const [predictions, setPredictions] = useState([]);
  const wrapperRef = createRef();
  const { push } = useHistory();

  const {
    setFocus,
    hasFocus,
    handleChange,
    handleClick,
    inputData,
  } = useAutocompleteService(setPredictions);

  const emitChange = ({ target: { name: inpName, value } }) => {
    if (emitOnChange) emitOnChange({ target: { name: inpName, value } });
    handleChange({ target: { name: inpName, value } });
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      const timeout = setTimeout(() => {
        setFocus(false);
        clearTimeout(timeout);
      }, 200);
    }
  };

  const handleChevronClick = () => {
    handleClick();
  };

  const showChevronButton = () => {
    if (chevronButtonVisible) {
      return (
        <div
          onClick={handleChevronClick}
          aria-pressed="false"
          tabIndex="0"
          role="button"
          name="click"
          className="input-group-append button-go-feed"
        >
          <span className="input-group-text button-search">
            <ChevronRight />
          </span>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <Fragment>
      <div ref={wrapperRef} style={!standalone ? style : {}} className={!standalone ? className : ''}>
        {!standalone &&
          <Fragment>
            <div className="input-group-prepend">
              <span className="input-group-text location-marker">
                <MapMarker />
              </span>
            </div>
            <label hidden htmlFor={name || 'searchLocation'}>type address</label>
          </Fragment>}
        <Field.Input
          type="text"
          id={name || 'searchLocation'}
          name={name || 'searchLocation'}
          placeholderText="Enter your address..."
          classNames={!standalone ? 'text-field form-control searchlocation' : 'Primary-Input'}
          handleChange={emitChange}
          onFocus={() => setFocus(true)}
          value={inputData}
        />
        {showChevronButton()}
      </div>
      {showDropdown && (<div className="carousel-divider mb-0" />)}
      <div className="dropdown-suggestion">
        {(hasFocus || showDropdown) && (
          <Fragment>
            {showDeliveryOrPickupNav ? <DeliveryOrPickupNav /> : null}
            <SuggestionsDropdown
              push={push}
              setLocation={handleClick}
              predictions={predictions}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default SearchLocation;

SearchLocation.defaultProps = {
  chevronButtonVisible: false,
  showDeliveryOrPickupNav: false,
  showDropdown: false,
};

SearchLocation.propTypes = {
  showDropdown: PropTypes.bool,
  chevronButtonVisible: PropTypes.bool,
  showDeliveryOrPickupNav: PropTypes.bool,
};
