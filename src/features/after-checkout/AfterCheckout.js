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
import { connect } from 'react-redux';
import { removeItem, updateItem } from './../../redux/activeOrder';
import { Redirect } from 'react-router-dom';

let socket;
const to = 'https://mybukka-backend.herokuapp.com/';

const Aftercheckout = ({ activeOrderReducer, updateItem, removeItem }) => {
  const { API } = useApi();
  const [pending, setPending] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { afterCheckout, setAfterCheckout, setModal } = useModalContext();
  const { isPending, items, currentView } = activeOrderReducer;

  // const {
  //   isPending,
  //   items,
  //   currentView,
  //   updateItem,
  //   removeItem,
  // } = usePendingOrderContext();
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
  useEffect(() => {
    if (currentView.status === 'accepted') {
      setRedirect(true);
      handleClose();
    }
  }, [currentView]);

  const handleCancel = async () => {
    if (currentView.status === 'pending') {
      const result = confirm('Want to cancel order ?');
      if (!result) return;
      loading(true);
      try {
        await API.updateOrder
          .delete(`${currentView._id}?status=cancelled`)
          .then((r) => console.log(r));
        loading(false);
        handleClose();
        removeItem(currentView._id);
      } catch (error) {
        console.log({ error });
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
      {redirect && <Redirect to="/incoming-delivery" />}
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
};

const mapStateToProps = ({ activeOrderReducer }) => ({
  activeOrderReducer: activeOrderReducer,
});
const mapDispatchToProps = (dispatch) => ({
  removeItem: (payload) => dispatch(removeItem(payload)),
  updateItem: (payload) => dispatch(updateItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Aftercheckout);
