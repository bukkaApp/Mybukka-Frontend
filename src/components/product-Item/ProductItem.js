import React from 'react';
import './ProductItem.scss';
import Field from '../input/Field';

// product calories - cal
const ProductItem = ({ id, product, canSelectMore, handleClick, selected, isRequired }) => {
  const emitOnClick = () => {
    handleClick(id, product, canSelectMore);
  };

  return (
    <li className="ProductItem">
      <div role="button" tabIndex="0" aria-pressed="false" onClick={emitOnClick} className="ProductItem-content">
        {canSelectMore ?
          <Field.Checkbox onChange={() => {}} id={product._id} checked={selected} value={product.name} optional />
          : <Field.Radio name={id} onChange={() => {}} id={product._id} checked={selected} value={product.name} optional={isRequired} />}
        <label htmlFor={product._id}>
          {product.name}
          <span className="label-hint">
            <span>{product.cal ? `${product.cal} cal` : ''}</span>
          </span>
        </label>
        <span className="label-price">+ <span>₦{product.price}</span></span>
      </div>
    </li>
  );
};
export default ProductItem;
