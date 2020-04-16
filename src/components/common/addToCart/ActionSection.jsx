import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Column from 'Components/grid/Column';
import Row from 'Components/grid/Row';
import updateCartAction from 'Redux/updateCartAction';
import toggleAddToCartModal from 'Redux/toggleAddToCartModal';
import manipulateMealAction from 'Redux/manipulateMealAction';
import { ReactSubMenuProvider } from './OrderOptions';
import SelectQuantityButtons from './SelectQuantityButtons';
import AddToCartButton from './AddToCartButton';

import './actionSection.scss';

const ActionSection = ({
  price,
  addToCart,
  quantity,
  manipulateMeal,
  mealToDisplay,
  toggleAddToCart
}) => {
  const state = useContext(ReactSubMenuProvider);

  const handleClick = () => {
    const { specialInstruction, customerSubmenu, submenus, options } = state;
    const result = state.handleSubmenu(submenus, customerSubmenu);
    const menuToAdd = { ...mealToDisplay, options, specialInstruction, submenus: result };
    addToCart(menuToAdd, true, state.submit(true));
    toggleAddToCart(false)
  };

  return (
    <Row classNames="action-section">
      <Column classNames="col-lg-4 d-none d-lg-block quantity-toggler-buttons">
        <SelectQuantityButtons
          quantity={quantity}
          manipulateMeal={manipulateMeal}
          itemIsInCart={state.isSubmitted}
        />
      </Column>
      <AddToCartButton
        price={price}
        submenus={state}
        itemIsInCart={state.isSubmitted}
        handleClick={() => handleClick()}
      />
    </Row>
  );
};

const mapStateToProps = ({
  fetchBukkaMenuReducer: { mealToDisplay },
  cartReducer: { items }
}) => ({
  mealToDisplay,
  // itemIsInCart:
  //   items.filter(item => item.slug === mealToDisplay.slug).length > 0
});

export default connect(mapStateToProps, {
  addToCart: updateCartAction,
  manipulateMeal: manipulateMealAction,
  toggleAddToCart: toggleAddToCartModal
})(ActionSection);

ActionSection.propTypes = {
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  manipulateMeal: PropTypes.func.isRequired,
  toggleAddToCart:PropTypes.func.isRequired
};
