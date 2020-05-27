/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';

import PropTypes from 'prop-types';
import SuggestionsDropdown from 'Components/places-suggest/SuggestionsDropdown';

import Field from 'Components/input/Field';
import useAutocompleteService from '../../../hooks/useAutocompleteService';

const Address = ({
  useCurrentLocationVisible,
  handleInputChange,
  propData,
}) => {
  const wrapperRef = React.createRef();
  // const [predictions, setPredictions] = useState([]);
  const { predictions, selectedLocation, handleChange, handleClick } = useAutocompleteService();
  const [inputData, setInputData] = useState('');
  const [isFocused, setFocus] = useState(false);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus(false);
    }
  };

  const onSelect = (predict, isGeoCode) => {
    handleClick(predict, isGeoCode);
    const value = predict.description;
    setInputData(value);
    handleInputChange({ target: { name: 'address', value } });
    setFocus(false);
  };

  const handleCollapse = (event) => {
    if (inputData && !inputData.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    if (selectedLocation && selectedLocation.description) {
      setInputData(selectedLocation.description);
    }
  }, [selectedLocation]);

  const emitOnChange = ({ target: { value } }) => {
    handleChange({ target: { value } });
    setInputData(value);
    handleInputChange({ target: { name: 'address', value } });
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.addEventListener('click', handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <Field.Input
        inputElement={{ autoComplete: 'off' }}
        type={propData.type}
        name={propData.name}
        handleChange={emitOnChange}
        classNames={propData.classNames}
        value={inputData}
        onFocus={() => setFocus(true)}
        label="Location"
        placeholderText="Enter your address..."
        id={propData.id}
        onClick={handleCollapse}
      />
      <div className="dropdown-suggestion position-relative top__30n">
        {isFocused && (
          <Fragment>
            <SuggestionsDropdown
              predictions={predictions}
              setLocation={onSelect}
              useCurrentLocationVisible={useCurrentLocationVisible}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Address;

Address.defaultProps = {
  useCurrentLocationVisible: false,
  handleInputChange: () => {},
  propData: {}
};

Address.propTypes = {
  selectedLocation: PropTypes.shape({}).isRequired,
  useCurrentLocationVisible: PropTypes.bool,
  handleInputChange: PropTypes.func,
  propData: PropTypes.objectOf({
    name: PropTypes.string,
  })
};
