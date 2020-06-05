import React from 'react';

import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
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
  const { addressPopup, setAddressPopup, setModal } = useModalContext();

  const handleClick = () => {
    setModal(false);
    setAddressPopup(false);
  };

  const addressFormJsx = <AddressForm handleClick={handleClick} {...props} />;

  if (props.withModal) {
    return (
      <Modal onClickOut={handleClick} show={addressPopup} bodyClassName="SmallWidth">
        <Container>
          <AddressHeader handleClick={handleClick} />
          {addressFormJsx}
        </Container>
      </Modal>
    );
  }
  return addressFormJsx;
};

export default Address;

Address.defaultProps = {
  type: 'address'
};

Address.propTypes = {
  type: PropTypes.string
};
