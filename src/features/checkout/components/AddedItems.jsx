import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import removeFromCartAction from 'Redux/removeFromCart';
import setMealToDisplayAction from 'Redux/setMealToDisplayAction';
import Price from 'Components/badge/Price';
import Button from 'Components/button/Button';

import './addedItem.scss';
import { useBusinessContext } from '../../../context/BusinessContext';
import { useModalContext } from '../../../context/ModalContext';

const Edit = ({ handleClick }) => (
  <Button
    text="EDIT"
    type="button"
    handleClick={handleClick}
    classNames="cart-action-button-primary"
    dataTarget="#mealModal"
    dataToggle="modal"
  />
);

const Remove = ({ handleClick }) => (
  <Button
    text="REMOVE"
    type="button"
    handleClick={handleClick}
    classNames="cart-action-button-default"
  />
);

const OrderTray = ({ handleRemove, handleEdit, name, price }) => (
  <div className="d-flex order-tray">
    <div className="col p-0">
      <h5 className="item-name">1 × {name}</h5>
      <div className="action-item-section">
        <Edit handleClick={handleEdit} />
        <Remove handleClick={handleRemove} />
      </div>
    </div>
    <div className="p-0">
      <Price price={price} classNames="price-badge-black" />
    </div>
  </div>
);

const AddedItem = ({ cart, bukka, removeFromCart }) => {
  const { business } = useBusinessContext();
  const { setCatelogToDisplay } = useBusinessContext();
  const { setModal, setCartPopup } = useModalContext();

  const toggleCart = (item) => {
    setCatelogToDisplay(item);
    setModal(true);
    setCartPopup(true);
  };

  return (
    <div className="cart-menu">
      <div className="cart-bukka-details">
        <h5 className="cart-bukka-name">{business && business.name}</h5>
        <h5 className="cart-bukka-view-menu">
          <Link
            className="text-success view-menu-text"
            to={`/bukka/${bukka.slug}`}
          >
            VIEW MENU
          </Link>
        </h5>
      </div>

      {cart.map((item, index) => (
        <OrderTray
          name={item.title}
          price={item.price}
          key={index}
          handleRemove={() => removeFromCart(item.slug, index)}
          handleEdit={() => toggleCart(item)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({
  cartReducer: { items },
  businessReducer: { fetchedBukka },
}) => ({ cart: items, bukka: fetchedBukka });

export default connect(mapStateToProps, {
  removeFromCart: removeFromCartAction,
  setMealToDisplay: setMealToDisplayAction,
})(AddedItem);

OrderTray.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

Remove.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

Edit.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
