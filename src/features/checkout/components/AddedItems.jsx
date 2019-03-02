import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Price from 'Components/badge/Price';
import Button from 'Components/button/Button';
import itemDetails from '../InputAttribute/inputData.json';

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

const AddedItem = () => {
  const [suggestedItemsInTray, setTray] = useState(itemDetails.suggestedTray);

  const removeItemHandler = (index) => {
    // get the state
    const trayItem = [...suggestedItemsInTray];
    trayItem.splice(index, 1);
    // set the suggestedItemsInTray state
    setTray(trayItem);
    // replace in json but no need if redux state
    itemDetails.suggestedTray = trayItem;
  };

  useEffect(() => {
    setTray(itemDetails.suggestedTray);
  });

  return (
    <div className="cart-menu">
      <div className="cart-bukka-details">
        <h5 className="cart-bukka-name">{"Mel's Drive-In"}</h5>
        <h5 className="cart-bukka-view-menu">
          <Link className="text-success view-menu-text" to="/feed">
            VIEW MENU
          </Link>
        </h5>
      </div>

      {suggestedItemsInTray.map((item, index) => (
        <OrderTray
          name={item.name}
          price={item.price}
          key={item.name}
          handleRemove={() => removeItemHandler(index)}
        />
      ))}
    </div>
  );
};

export default AddedItem;

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
