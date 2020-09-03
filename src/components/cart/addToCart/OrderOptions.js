import React from 'react';
import { useMediaQuery } from 'react-responsive';
import FooterBigScreen from '../../footer/FooterBigScreen';
import ProductList from '../../product-list/ProductList';
import FooterSmallScreen from '../../footer/FooterSmallScreen';
import ProductDescription from '../../product-description/ProductDescription';

import './OrderOptions.scss';
import { useCartContext } from '../../../context/CartContext';

const OrderOptions = ({
  onClick, price, title, description, storeIntoCart, catelogToDisplay
}) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const { inProgressCart: { totalCost, originalCost } } = useCartContext();

  return (
    <div className="OrderOptions">
      <div className="OrderOptions-Top">
        <ProductDescription title={title} desc={description} onClick={onClick} />
        <ProductList products={catelogToDisplay} />
        <FooterSmallScreen price={price} />
      </div>
      {isBigScreen && <FooterBigScreen withQtyBtn handleClick={storeIntoCart} totalCost={totalCost + (originalCost || price)} price={price} />}
    </div>
  );
};

export default OrderOptions;
