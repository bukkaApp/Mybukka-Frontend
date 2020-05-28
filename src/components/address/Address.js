import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import Modal from 'Components/modal/Modal';
import DismissModal from '../modal/DismissModal';
import { useModalContext } from '../../context/ModalContext';

import AddressForm from './AddressForm';
import './Address.scss';
import Container from '../container/Container';

const AddressHeader = ({ handleClick }) => (
  <div className="Address-Form-Header pb-1">
    <div className="text-end">
      <DismissModal onClick={handleClick} />
    </div>
    <div className="Address-Details-Header">
      <h5 className="Address-Details-Text">Add Delivery Address</h5>
    </div>
  </div>
);

const Address = (props) => {
  const wrapperRef = React.createRef();
  const { addressPopup, setAddressPopup, setModal } = useModalContext();

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setModal(false);
      setAddressPopup(false);
    }
  };

  const handleClick = () => {
    setModal(false);
    setAddressPopup(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const addressJsx = <AddressForm handleClick={handleClick} label="Add Address" {...props} />;

  if (props.withModal) {
    return (
      <Modal show={addressPopup} bodyClassName="SmallWidth" ref={wrapperRef}>
        <Container>
          <AddressHeader handleClick={handleClick} />
          {addressJsx}
        </Container>
      </Modal>
    );
  }
  return addressJsx;
};

export default Address;

Address.defaultProps = {
  type: 'address'
};

Address.propTypes = {
  type: PropTypes.string
};
