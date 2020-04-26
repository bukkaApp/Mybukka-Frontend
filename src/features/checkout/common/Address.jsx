/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';

import PropTypes from 'prop-types';
import SuggestionsDropdown from 'Components/places-suggest/SuggestionsDropdown';

import Input from 'Components/input/InputField';
import useLocationService from '../../../context/useLocationService';

const Address = ({
  useCurrentLocationVisible,
  handleInputChange,
  propData,
}) => {
  const wrapperRef = React.createRef();
  const { selectedLocation, handleChange, geoCodeLocation,} = useLocationService();
  const [inputData, setInputData] = useState('');
  const [isFocused, setFocus] = useState(false);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus(false);
    }
  };

  const handleCollapse = (event) => {
    if (inputData && !inputData.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    setInputData(selectedLocation.description);
  }, [selectedLocation]);

  const emitOnChange = ({ target: { value } }) => {
    setInputData(value);
    handleInputChange({ target: { name: 'address', value } });
    handleChange({ target: { value } });
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  });

  return (
    <div ref={wrapperRef}>
      <Input
        inputElement={{ autoComplete: 'off' }}
        type={propData.type}
        name={propData.name}
        handleChange={emitOnChange}
        classNames={propData.classNames}
        value={inputData}
        handleFocus={() => setFocus(true)}
        label="Location"
        placeholderText="Enter your address..."
        id={propData.id}
        onClick={handleCollapse}
      />
      <div className="dropdown-suggestion position-relative top__30n">
        {isFocused && (
          <Fragment>
            <SuggestionsDropdown
              setLocation={geoCodeLocation}
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
  google: PropTypes.shape({}).isRequired,
  updatePredictions: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({}).isRequired,
  selectLocation: PropTypes.func.isRequired,
  useCurrentLocationVisible: PropTypes.bool,
  handleInputChange: PropTypes.func,
  propData: PropTypes.objectOf({
    name: PropTypes.string,
  })
};
