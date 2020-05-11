import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import manipulateSubmenusAction from 'Redux/manipulateSubmenusAction';
import toggleAddToCartModal from 'Redux/toggleAddToCartModal';
import updateCartAction from 'Redux/updateCartAction';
import MealImage from './MealImage';
import OrderOptions from './OrderOptions';
import FooterBigScreen from '../../footer/FooterBigScreen';
import Modal from '../../modal/Modal';
import './index.scss';
import { useModalContext } from '../../../context/UseModal';
import { useCartContext } from '../../../context/CartContext';

const AddToCart = ({ addToCart, mealToDisplay, manipulateSubmenus, modalShow, toggleAddToCart }) => {
  const wrapperRef = React.createRef();
  const formRef = React.createRef();
  const { setModal } = useModalContext();
  const { price, imageUrl } = mealToDisplay;
  const { clearInProgressCart, inProgressCart: { totalCost, originalCost, products } } = useCartContext();
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  const handleClick = (action) => {
    setModal(action);
    toggleAddToCart(action);
    clearInProgressCart();
  };

  const storeIntoCart = (e) => {
    let timout;
    if (formRef.current.checkValidity()) {
      e.preventDefault();
      const newOrder = { ...mealToDisplay, submenus: products };
      addToCart(newOrder);
      timout = setTimeout(() => {
        handleClick(false);
        clearTimeout(timout);
        console.log(timout);
      }, 200);
    }
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setModal(false);
      toggleAddToCart(false);
      clearInProgressCart();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <Modal ref={wrapperRef} bodyClassName="modal-overflow-none" show={modalShow} useFullWidth={imageUrl !== ''}>
      <form ref={formRef} className="Add-to-cart">
        <div className="Add-to-cart_content">
          {imageUrl &&
          <MealImage
            toggleAddToCart={handleClick}
            imageUrl={imageUrl}
          />}
          <OrderOptions
            mealToDisplay={mealToDisplay}
            manipulateSubmenus={manipulateSubmenus}
            toggleAddToCart={handleClick}
            storeIntoCart={storeIntoCart}
          />
        </div>
        {!isBigScreen && <FooterBigScreen withQtyBtn handleClick={storeIntoCart} totalCost={totalCost + (originalCost || price)} price={price} />}
      </form>
    </Modal>
  );
};
const mapStateToProps = ({ productsReducer: { mealToDisplay, modalShow } }) => ({
  mealToDisplay,
  modalShow,
});

export default connect(
  mapStateToProps,
  {
    manipulateSubmenus: manipulateSubmenusAction,
    toggleAddToCart: toggleAddToCartModal,
    addToCart: updateCartAction,
  }
)(AddToCart);

AddToCart.defaultProps = {
  imageUrl: '',
};
