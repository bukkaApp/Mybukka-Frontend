import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Modal from './../../components/modal/Modal';
import { useModalContext } from '../../context/ModalContext';
import { useLoadingContext } from '../../context/LoadingContext';
import { usePendingOrderContext } from '../../context/PendingOrderContext';
import Logo from '../../components/brand/Logo';
import useApi from '../../shared/api';
import DismissModal from './../../components/modal/DismissModal';

import './AfterCheckout.scss';

let socket;
const to = 'https://mybukka-backend.herokuapp.com/';

export default function Aftercheckout() {
  const { API } = useApi();
  const [pending, setPending] = useState(false);

  const { afterCheckout, setAfterCheckout, setModal } = useModalContext();
  const {
    isPending,
    items,
    currentView,
    updateItem,
    removeItem,
  } = usePendingOrderContext();
  const { loading } = useLoadingContext();

  useEffect(() => {
    if (currentView.status === 'pending') {
      setPending(true);
    } else {
      setPending(false);
    }
    if (!currentView) {
      handleClose();
    }
  }, [currentView]);

  useEffect(() => {
    if (isPending) {
      socket = io(to);

      items.map((item) => {
        socket.on(`${item._id}`, (data) => {
          updateItem(data);
        });
      });
      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, [items, currentView, isPending]);

  console.log(currentView);

  const handleCancel = async () => {
    if (currentView.status === 'pending') {
      const result = confirm('Want to cancel order ?');
      if (!result) return;
      loading(true);
      try {
        await API.updateOrder
          .delete(currentView._id)
          .then((r) => console.log(r));
        loading(false);
        handleClose();
        removeItem(currentView._id);
      } catch (error) {
        console.log(error);
        loading(false);
      }
    } else {
      const result = confirm('Want to close the modal');
      if (!result) return;
      handleClose();
    }
  };

  const handleClose = () => {
    setAfterCheckout(false);
    setModal(false);
  };

  const handleNewOrder = () => {
    const result = confirm('Want to create a new order');
    if (!result) return;
    handleClose();
  };
  return (
    <Modal
      show={afterCheckout}
      bodyClassName="MediumWidth"
      onClickOut={handleClose}
    >
      <div onDoubleClick={() => {}} className="text-end">
        <DismissModal onClick={() => {}} />
      </div>
      <div className="after-checkout-modal">
        <Logo />
        <p className="after-checkout-title">
          {pending
            ? 'Order Sent, Awaiting Approval'
            : 'Your order has been rejected'}
        </p>
        <p className="after-checkout-title"></p>
        <p className="text-gray">
          We help businesses like yours reach new customers in your
          neighborhoods and grow to become local favorites.
        </p>
        <div className="after-checkout-actions">
          <p onClick={handleCancel} className="cancel">
            {pending ? ' Cancel Order' : 'cancel'}
          </p>

          <p onClick={handleNewOrder} className="text-gray">
            Order Another Item
          </p>
        </div>
      </div>
    </Modal>
  );
}
