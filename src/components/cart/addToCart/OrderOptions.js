import React from 'react';
import { useMediaQuery } from 'react-responsive';
import FooterBigScreen from '../../footer/FooterBigScreen';
import ProductList from '../../product-list/ProductList';
import FooterSmallScreen from '../../footer/FooterSmallScreen';
import ProductDescription from '../../product-description/ProductDescription';

import './OrderOptions.scss';
import { useCartContext } from '../../../context/CartContext';

const OrderOptions = ({ toggleAddToCart, mealToDisplay, storeIntoCart }) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const { price, title, description } = mealToDisplay;
  const { inProgressCart: { totalCost, originalCost } } = useCartContext();

  return (
    <div className="OrderOptions">
      <div className="OrderOptions-Top">
        <ProductDescription title={title} desc={description} toggleAddToCart={toggleAddToCart} />
        <ProductList products={mealToDisplay} />
        <FooterSmallScreen price={price} />
      </div>
      {isBigScreen && <FooterBigScreen withQtyBtn handleClick={storeIntoCart} totalCost={totalCost + (originalCost || price)} price={price} />}
    </div>
  );
};

export default OrderOptions;
