/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortId from 'shortid';
import updateCartAction from 'Redux/updateCartAction';
import manipulateMealAction from 'Redux/manipulateMealAction';

import InputField from 'Components/input/InputField';
import { ReactStateProvider } from './OrderOptions';
import './submenus.scss';
// SUB MENUS

const EachSubMenus = ({
  menu, type, submenuId,
  optionId, mealSlug,
  submenus, index, isRequired, handleClick,
}) => {
  const defaultChecked = index === 0 && isRequired;
  const [checked, setCheck] = useState(defaultChecked);
  const isMutipleOptions = type === 'multiple';

  const handleOnClick = (e) => {
    setCheck(!checked);
    handleClick(menu._id, submenuId, type);
  };

  return (
    <ReactStateProvider.Consumer>
      {(value) => {
        const subMenusArr = value[submenuId] || [];
        return (
          <div className="sub-menu cursor-pointer">
            <InputField
              name={submenuId}
              type={isMutipleOptions ? 'checkbox' : 'radio'}
              defaultValue={menu.name}
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
              onClick={handleOnClick}
              role="button"
              aria-pressed="false"
              tabIndex="0"
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
          submenus={submenus}
          mealSlug={mealSlug}
          submenuId={submenuId}
          isRequired={isRequired}
          index={index}
          type={type}
          optionId={menu._id}
          key={shortId.generate()}
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
  // itemIsInCart:
  //   items.filter(item => item.slug === mealToDisplay.slug).length > 0,
  // submenus:
});

export default connect(mapStateToProps, {
  addToCart: updateCartAction,
  manipulateMeal: manipulateMealAction
})(SubMenus);

// SubMenus.propTypes = {
//   title: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   submenuId: PropTypes.string.isRequired,
//   mealSlug: PropTypes.string.isRequired,
//   menus: PropTypes.arrayOf(PropTypes.object({})).isRequired,
// };

// EachSubMenus.propTypes = {
//   optionId: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   submenuId: PropTypes.string.isRequired,
//   mealSlug: PropTypes.string.isRequired,
//   menu: PropTypes.shape({}).isRequired,
// };
