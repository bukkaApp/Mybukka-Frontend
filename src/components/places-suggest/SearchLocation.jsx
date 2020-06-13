import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import MapMarker from 'Icons/MapMarker';
import ChevronRight from 'Icons/ChevronRight';
import Field from 'Components/input/Field';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import SuggestionsDropdown from './SuggestionsDropdown';
import ClickOut from '../ClickOut/ClickOut';

import './searchlocation.scss';
import useAutocompleteService from '../../hooks/useAutocompleteService';
import { useLoadingContext } from '../../context/LoadingContext';

const style = { border: '1 px solid #eceff1' };
const className = 'input-group address-input-section';

const SearchLocation = ({
  showDeliveryOrPickupNav,
  chevronButtonVisible,
  showDropdown,
  emitOnChange,
  withLoading,
  standalone,
  withLabel,
  onBlur,
  htmlFor,
  name,
  state,
  onClick,
  useCurrentLocationVisible,
  useModal,
}) => {
  const { loading } = useLoadingContext();
  const [predictions, setPredictions] = useState([]);

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

  const emitClick = (...props) => {
    if (withLoading) loading(true);
    if (useModal) onClick(false);
    handleClick(...props);
  };

  const handleChevronClick = () => {
    if (inputData && withLoading) loading(true);
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

  return (
    <ClickOut className="Location-Wrapper" onClickOut={() => setFocus(false)}>
      <div style={!standalone ? style : {}} className={!standalone ? className : ''}>
        {!standalone &&
        <div className="input-group-prepend">
          <span className="input-group-text location-marker">
            <MapMarker />
          </span>
        </div>}
        <label
          hidden={!withLabel}
          htmlFor={htmlFor || 'searchLocation'}
          className={`font-size-14 ${state ? 'Fly--over m-0' : 'No--label'}`}
        >
          {name || 'type address'}
        </label>
        <Field.Input
          type="text"
          id={name || 'searchLocation'}
          onBlur={onBlur}
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
      <div className={`Location-Dropdown-Suggestion${useModal ? '--relative' : '--absolute'}`}>
        {(hasFocus || showDropdown) && (
          <Fragment>
            {showDeliveryOrPickupNav ? <DeliveryOrPickupNav /> : null}
            <SuggestionsDropdown
              useCurrentLocationVisible={useCurrentLocationVisible}
              setLocation={emitClick}
              predictions={predictions}
              useModal={useModal}
            />
          </Fragment>
        )}
      </div>
    </ClickOut>
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
