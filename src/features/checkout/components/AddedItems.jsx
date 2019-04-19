import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import removeFromCartAction from 'Redux/removeFromCartAction';
import Price from 'Components/badge/Price';
import Button from 'Components/button/Button';

import './addedItem.scss';

const Edit = ({ handleClick }) => (
  <Button
    text="EDIT"
    type="button"
    handleClick={handleClick}
    classNames="cart-action-button-primary"
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

const AddedItem = ({ cart, bukka, removeFromCart }) => (
  <div className="cart-menu">
    <div className="cart-bukka-details">
      <h5 className="cart-bukka-name">{bukka.name}</h5>
      <h5 className="cart-bukka-view-menu">
        <Link className="text-success view-menu-text" to={`/bukka/${bukka.slug}`}>
          VIEW MENU
        </Link>
      </h5>
    </div>

    {cart.map(item => (
      <OrderTray
        name={item.title}
        price={item.price}
        key={item.slug}
        handleRemove={() => removeFromCart(item.slug)}
        handleEdit={() => {}}
      />
    ))}
  </div>
);

const mapStateToProps = ({
  fetchBukkaMenuReducer: { cart },
  fetchBukkaReducer: { fetchedBukka }
}) => ({ cart, bukka: fetchedBukka });

export default connect(
  mapStateToProps,
  { removeFromCart: removeFromCartAction }
)(AddedItem);

OrderTray.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

Remove.propTypes = {
  handleClick: PropTypes.func.isRequired
};

Edit.propTypes = {
  handleClick: PropTypes.func.isRequired
};
