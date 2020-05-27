import React from 'react';

import PropTypes from 'prop-types';

import { RoundedPlus } from 'Icons/Plus';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import PlainAccountDetails from '../common/PlainAccountDetails';
import AddMoreSection from '../common/AddMoreSection';

import { useModalContext } from '../../../context/ModalContext';
import './addresses.scss';

const AddAnAddress = () => {
  const { setAddressPopup, setModal } = useModalContext();

  const handleClick = () => {
    setModal(true);
    setAddressPopup(true);
  };

  return (
    <div className="add-address" data-toggle="modal">
      <AddMoreSection onClick={handleClick} text="add new address">
        <RoundedPlus />
      </AddMoreSection>
    </div>
  );
};

const Addresses = ({ addresses, ...props }) => (
  <div className="addresses-section">
    <AccountDetailsGroupHeader text="Addresses" />
    {addresses.map && addresses.map(address => (
      <PlainAccountDetails
        handleEdit={() => props.handleDelete(address)}
        btnText="DELETE"
        text={address.address}
        key={`Plain-Account-Details-DELETE-$${address._id}`}
      />
    ))}
    <AddAnAddress />
  </div>
);

export default Addresses;

Addresses.defaultProps = {
  addresses: null
};

const proptypes = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.string
      ])
    ),
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ])
);

Addresses.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  addresses: PropTypes.oneOfType([
    PropTypes.arrayOf(proptypes),
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.arrayOf(proptypes)
      ])
    )
  ])
};
