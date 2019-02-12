import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/button/Button';
import itemDetails from '../InputAttribute/inputData.json';

const Edit = ({ handleClick }) => (
  <Button
    text="Edit"
    type="button"
    handleClick={handleClick}
    classNames="uppercase bold font-size-11
    btn btn-link p-0 pr-2 text-success"
  />
);

const Remove = ({ handleClick }) => (
  <Button
    text="Remove"
    type="button"
    handleClick={handleClick}
    classNames="uppercase bold
    font-size-11 text-muted btn btn-link p-0 pl-2 pr-2"
  />
);

const OrderTray = ({ handleRemove, handleEdit, name, price }) => (
  <div className="d-flex justify-content-between mt-4">
    <div className="col p-0">
      <h5 className="font-size-14">1 × {name}</h5>
      <div className="justify-content-between p-0">
        <Edit handleClick={handleEdit} />
        <Remove handleClick={handleRemove} />
      </div>
    </div>
    <div className="p-0">
      <h5 className="font-size-14">{ price }</h5>
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
    <div className="container">

      <div className="d-flex justify-content-between border-bottom pb-4 mb-2">
        <h5 className="font-size-14">{"Mel's Drive-In"}</h5>
        <h5 className="font-size-12">
          <a className="text-success" href="/feed">VIEW MENU</a>
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
