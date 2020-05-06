import React, { useState } from 'react';
import { connect } from 'react-redux';
import updateCartAction from 'Redux/updateCartAction';
import manipulateMealAction from 'Redux/manipulateMealAction';

import InputField from 'Components/input/InputField';
import { ReactStateProvider } from './OrderOptions';
import './submenus.scss';
// SUB MENUS

const EachSubMenus = ({
  menu, type, submenuId,
  index, isRequired, handleClick,
}) => {
  const defaultChecked = index === 0 && isRequired;
  const [checked, setCheck] = useState(defaultChecked);
  const isMutipleOptions = type === 'multiple';

  const handleOnClick = () => {
    setCheck(!checked);
    handleClick(menu._id, submenuId, type);
  };

  return (
    <ReactStateProvider.Consumer>
      {(value) => {
        const subMenusArr = value[submenuId] || [];
        return (
          <div className="sub-menu cursor-pointer" tabIndex="0" onClick={handleOnClick} role="button">
            <InputField
              name={submenuId}
              type={isMutipleOptions ? 'checkbox' : 'radio'}
              value={menu.name}
              classNames={isMutipleOptions ? 'custom-checkbox' : 'radio'}
              checked={
                isMutipleOptions ? subMenusArr.find(el => el === menu._id) :
                  value[submenuId] === menu._id
              }
              id={menu.name}
              handleChange={handleOnClick}
            />
            <label
              htmlFor={menu.name}
              className="col-10 pl-0 menu-text d-flex justify-content-between"
              aria-pressed="false"
            >
              <span>{menu.name}</span>
              <span className="text-muted">₦{menu.price}</span>
            </label>
          </div>
        );
      }}
    </ReactStateProvider.Consumer>
  );
};

const SubMenus = ({
  menus,
  title,
  type,
  isRequired,
  mealSlug,
  submenuId,
  submenus,
  handleClick
}) => (
  <div className="sub-menus unselectable">
    <h5 className="header text-uppercase d-flex justify-content-between col-11 px-0">
      {title} {` (Up to ${menus.length})`}
      {isRequired &&
        <span title="it's required" className="text-muted pr-3">REQUIRED</span>}
    </h5>
    {menus.map((menu, index) => (
      (menu.price && menu.name) &&
        <EachSubMenus
          key={`each-submenus-${mealSlug}-${submenuId}-${menu._id}`}
          submenus={submenus}
          mealSlug={mealSlug}
          submenuId={submenuId}
          isRequired={isRequired}
          index={index}
          type={type}
          optionId={menu._id}
          menu={menu}
          handleClick={handleClick}
        />
    ))}
  </div>
);

const mapStateToProps = ({
  fetchBukkaMenuReducer: { mealToDisplay },
  cartReducer: { items }
}) => ({
  mealToDisplay,
  cart: items,
});

export default connect(mapStateToProps, {
  addToCart: updateCartAction,
  manipulateMeal: manipulateMealAction
})(SubMenus);
