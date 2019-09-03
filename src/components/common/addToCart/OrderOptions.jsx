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

export const ReactStateProvider = React.createContext({});

const OrderOptions = ({ title, description, price, slug, quantity, submenus, manipulateSubmenus }) => {
  const [state] = useState({
    manipulateSubmenus,
    mealToDisplay: { slug, submenus }
  });

  const [newState, setState] = useState({});

  const handleClick = (optionID, subMenuID, type) => {
    console.log(newState, 'optionID, subMenuID, type', optionID, subMenuID, type);
    if (type === 'multiple') {
      const subMenuState = newState[subMenuID] || [];
      setState({
        ...newState,
        [subMenuID]: [...new Set([...subMenuState, optionID])],
      });
    } else {
      setState({
        ...newState,
        [subMenuID]: optionID,
      });
    }
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
      <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-5 order-options-section">
        <div
          data-dismiss="modal"
          className="dismiss-modal-options d-none d-lg-block"
        >
          <Cancel />
        </div>
        <div className="options-details">
          <MealTitle title={title} />
          <MealDescription description={description} />
          <SpecialInstructions />
          {submenus.length > 0 && submenus.map(eachMenu => (
            <SubMenus
              key={shortId.generate()}// eslint-disable-line
              mealSlug={slug}
              submenus={submenus}
              submenuId={eachMenu._id} // eslint-disable-line
              type={eachMenu.type}
              menus={eachMenu.options}
              title={eachMenu.title}
              isRequired={eachMenu.isRequired}
              handleClick={handleClick}
            />
          ))}
        </div>
        <ActionSection price={price} slug={slug} quantity={quantity} />
      </Column>
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
