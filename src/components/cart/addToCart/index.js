import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import manipulateSubmenusAction from 'Redux/manipulateSubmenusAction';
import updateCartAction from 'Redux/updateCartAction';
import MealImage from './MealImage';
import OrderOptions from './OrderOptions';
import FooterBigScreen from '../../footer/FooterBigScreen';
import Modal from '../../modal/Modal';
import './index.scss';
import { useModalContext } from '../../../context/ModalContext';
import { useCartContext } from '../../../context/CartContext';
import { useBusinessContext } from '../../../context/BusinessContext';

const AddToCart = ({ addToCart, manipulateSubmenus }) => {
  const formRef = React.createRef();
  const [state, setState] = useState({
    price: 0,
    imageUrl: '',
    title: '',
    description: '',
  });
  const { catelogToDisplay, setCatelogToDisplay } = useBusinessContext();
  const { setModal, setCartPopup, cartPopup } = useModalContext();
  const {
    clearInProgressCart,
    inProgressCart: { totalCost, originalCost, quantity, products },
  } = useCartContext();
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  const handleClick = (action) => {
    setModal(action);
    setCartPopup(action);
    clearInProgressCart();
    setCatelogToDisplay(null);
  };

  const storeIntoCart = (e) => {
    let timout;
    if (formRef.current.checkValidity()) {
      e.preventDefault();
      const newOrder = { ...catelogToDisplay, quantity, submenus: products };
      addToCart(newOrder);
      timout = setTimeout(() => {
        handleClick(false);
        clearTimeout(timout);
      }, 200);
    }
  };

  const handleClickOutside = () => {
    setModal(false);
    setCartPopup(false);
    clearInProgressCart();
    setCatelogToDisplay(null);
  };

  useEffect(() => {
    setState({ ...state, ...catelogToDisplay });
  }, [catelogToDisplay]);

  const { price, imageUrl, description, title } = state;

  return (
    <Modal
      onClickOut={handleClickOutside}
      bodyClassName="modal-overflow-none"
      show={cartPopup}
      useFullWidth={imageUrl !== ''}
    >
      <form ref={formRef} className="Add-to-cart">
        <div className="Add-to-cart_content">
          {imageUrl && <MealImage onClick={handleClick} imageUrl={imageUrl} />}
          <OrderOptions
            catelogToDisplay={catelogToDisplay}
            price={price}
            title={title}
            description={description}
            manipulateSubmenus={manipulateSubmenus}
            onClick={handleClick}
            storeIntoCart={storeIntoCart}
          />
        </div>
        {!isBigScreen && (
          <FooterBigScreen
            withQtyBtn
            handleClick={storeIntoCart}
            totalCost={totalCost + (originalCost || price)}
            price={price}
          />
        )}
      </form>
    </Modal>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  manipulateSubmenus: manipulateSubmenusAction,
  addToCart: updateCartAction,
})(AddToCart);
