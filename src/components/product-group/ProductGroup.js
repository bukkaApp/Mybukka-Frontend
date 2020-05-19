import React from 'react';
import ProductItem from '../product-Item/ProductItem';
import './ProductGroup.scss';

const ProductGroup = ({ isRequired, selectedProducts, submenu, title, type, id, handleClick }) => {
  const isSelected = productId => selectedProducts.length > 0
    && selectedProducts.filter(prod => prod._id === productId).length > 0;

  return (
    <div className="ProductGroup">
      <div className="ProductGroup-Title">
        <span className="ProductGroup-Title-Text">
          <span>{title} (Up to {submenu.length})</span>
        </span>
      </div>
      <ul className="ProductGroup-Body">
        {submenu.map(product =>
          product.visibility && (<ProductItem
            key={product._id}
            id={id}
            isRequired={isRequired}
            selected={isSelected(product._id)}
            product={product}
            handleClick={handleClick}
            canSelectMore={type === 'multiple'}
          />))}
      </ul>
    </div>
  );
};

export default ProductGroup;
