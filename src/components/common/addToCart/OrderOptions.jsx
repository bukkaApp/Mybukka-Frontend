import React from 'react';
import PropTypes from 'prop-types';


import Column from 'Components/grid/Column';
import Cancel from 'Components/icons/Cancel';
import { MealTitle, MealDescription } from 'Components/card/MealCard';

import SpecialInstructions from './SpecialInstructions';
import SubMenus from './SubMenus';
import ActionSection from './ActionSection';

import './orderOptions.scss';

const OrderOptions = ({ title, description, price, slug, quantity, submenus }) => (
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
        <SubMenus menus={eachMenu.options} title={eachMenu.title} />
      ))}
    </div>
    <ActionSection price={price} slug={slug} quantity={quantity} />
  </Column>
);

export default OrderOptions;

OrderOptions.defaultProps = {
  description: ''
};

OrderOptions.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
