/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import shortId from 'shortid';

import Column from 'Components/grid/Column';
import Cancel from 'Components/icons/Cancel';
import { MealTitle, MealDescription } from 'Components/card/MealCard';

import SpecialInstructions from './SpecialInstructions';
import SubMenus from './SubMenus';
import ActionSection from './ActionSection';

import './orderOptions.scss';
import Options from './Options';

export const ReactStateProvider = React.createContext({});
export const ReactSubMenuProvider = React.createContext({});

const OrderOptions = ({ title, description, price, slug, quantity, submenus, manipulateSubmenus, toggleAddToCart, options, imageUrl }) => {
  const [state, setState] = useState({});
  const [specialInstruction, handleSpecialInstruction] = useState('');
  const [isSubmitted, submit] = useState(false);
  const [option, setOption] = useState(options[0] || '');

  const handleClick = (optionID, subMenuID, type) => {
    if (type === 'multiple') {
      const subMenuState = state[subMenuID] || [];
      const remainingSubMenu = subMenuState.filter(el => el !== optionID);
      const remainingSubMenuLength = remainingSubMenu.length || 0;
      const subMenuItemRemoved = remainingSubMenuLength < subMenuState.length;
      const currentState = subMenuItemRemoved ? remainingSubMenu : [...subMenuState, optionID];
      setState({
        ...state,
        [subMenuID]: [...new Set(currentState)],
      });
    } else {
      setState({
        ...state,
        [subMenuID]: optionID,
      });
    }
  };

  const handleMultipleSubmenuOptions = (customerSubmenuOptions, submenuOption) => {
    const submenuSelected = [];
    customerSubmenuOptions.map((customerSubmenuOption) => {
      for (let i = 0; i < submenuOption.length; i++) {
        if (customerSubmenuOption === submenuOption[i]._id) {
          submenuSelected.push(submenuOption[i]);
        }
      }
    });
    return submenuSelected;
  };

  const handleSingleSubmenuOptions = (customerSubmenuOption, submenuOption) => submenuOption.find(option => option._id === customerSubmenuOption);

  const handleSubmenu = (initialSubmenus = [{ options: [{}] }], selectedSubmenus) => {
    const submenuSelected = [];
    Object.keys(selectedSubmenus).map((selectedSubmenu) => {
      for (let i = 0; i < initialSubmenus.length; i++) {
        if (selectedSubmenu === initialSubmenus[i]._id) {
          if (initialSubmenus[i].type === 'single') {
            const submenuOption = handleSingleSubmenuOptions(selectedSubmenus[selectedSubmenu], initialSubmenus[i].options);
            submenuSelected.push({ ...initialSubmenus[i], options: [submenuOption] });
          } else {
            const submenuOptions = handleMultipleSubmenuOptions(selectedSubmenus[selectedSubmenu], initialSubmenus[i].options);
            submenuSelected.push({ ...initialSubmenus[i], options: submenuOptions });
          }
        }
      }
    });
    return submenuSelected;
  };

  const handleDefaultSelection = () => {
    submenus.map(eachMenu => eachMenu.options.map((menu, index) =>
      ((index === 0 && eachMenu.isRequired) ?
        handleClick(menu._id, eachMenu._id, eachMenu.type)
        : null))
    );
  };

  useEffect(() => {
    handleDefaultSelection();
  }, []);

  return (
    <ReactStateProvider.Provider value={state}>
      <ReactSubMenuProvider.Provider value={
        {
          handleSubmenu,
          submenus,
          customerSubmenu: state,
          submit,
          isSubmitted,
          specialInstruction,
          options: [option],
        }
      }
      >
        <Column classNames={`col-12 col-xs-12 col-sm-12 col-md-12 col-lg-${imageUrl ? '5' : '12'} order-options-section`}>
          <div
            onClick={() => toggleAddToCart(false)}
            aria-pressed="false"
            tabIndex="0"
            role="button"
            className={`dismiss-modal-options ${imageUrl ? 'd-none' : ''} d-lg-block`}
          >
            <Cancel />
          </div>
          <div className="options-details">
            <MealTitle title={title} />
            <MealDescription description={description} />
            <SpecialInstructions
              quantity={quantity}
              handleChange={handleSpecialInstruction}
              itemsIsInCart={isSubmitted}
            />
            {options.length > 0 &&
            <Options menus={options} setOption={setOption} option={option} />
            }
            {submenus.length > 0 && submenus.map(eachMenu => (
              <SubMenus
              key={shortId.generate()}// eslint-disable-line
                mealSlug={slug}
                submenus={submenus}
              submenuId={eachMenu._id} // eslint-disable-line
                {...eachMenu}
                menus={eachMenu.options}
                handleClick={handleClick}
              />
            ))}
          </div>
          <ActionSection price={price} slug={slug} quantity={quantity} />
        </Column>
      </ReactSubMenuProvider.Provider>
    </ReactStateProvider.Provider>
  );
};
export default OrderOptions;

OrderOptions.defaultProps = {
  description: ''
};


// OrderOptions.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string,
//   price: PropTypes.number.isRequired,
//   slug: PropTypes.string.isRequired,
//   quantity: PropTypes.number.isRequired,
//   submenus: PropTypes.shape({}).isRequired,
// };
