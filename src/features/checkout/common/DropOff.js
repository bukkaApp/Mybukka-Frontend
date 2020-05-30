import React from 'react';
import { useHistory } from 'react-router-dom';

import TemporaryWrapper from '../../../components/ViewWrappers/TemporaryWrapper';

import Address from '../../../components/address/Address';
import GeoSuggestions from '../../../components/places-suggest/GeoSuggestions';
import { useUserContext } from '../../../context/UserContext';


const DropOff = () => {
  const { address: addresses } = useUserContext();
  const { push } = useHistory();

  return (
    <TemporaryWrapper>
      {(!addresses || !addresses.addresses.length) && <Address withFormSpace withPadding label="Delivery Address" />}
      <div className="addresses-section">
        {addresses && addresses.addresses.map(({ address, slug, _id: id }) => (
          addresses.defaultAddress === slug ?
            <GeoSuggestions
              asUtility
              handleClick={() => {}}
              text="Change"
              withPrimaryButton
              emitOnClick={() => push('/profile#addresses')}
              predictions={[{ terms: address.split(', ').map(loc => ({ value: loc })) }]}
              key={`Plain-Account-Details-DELETE-$${id}`}
            />
            : null
        ))}
      </div>
    </TemporaryWrapper>
  );
};

export default DropOff;
