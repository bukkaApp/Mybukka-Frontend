import React, { useState, useEffect } from 'react';
import ProductGroup from '../product-group/ProductGroup';
import './ProductList.scss';
import { useCartContext } from '../../context/CartContext';

const ProductList = ({ products }) => {
  const { setInProgressCart } = useCartContext();
  const [state, setState] = useState({});

  useEffect(() => {
    if (products) {
      const categories = [
        ...new Set(products.submenus.map(({ _id }) => _id))
      ];
      const storeHasObject = categories.reduce((a, b) => (a[b] = [], a), {}); // eslint-disable-line
      setState(storeHasObject);
    }
  }, [products]);

  const isVisibleProductGroup = (submenu) => {
    const visibilities = [...new Set(submenu.map(({ visibility }) => visibility))];
    return visibilities.filter(visible => visible).length > 0;
  };

  const handleProdSelection = (id, product, canSelectMore) => {
    let initProducts = state[id] || [], productCategories = [];
    if (initProducts.length) {
      productCategories = [...new Set(initProducts.map(({ _id }) => _id))];
    }
    // removed from multiple options selected
    if (canSelectMore && productCategories.includes(product._id)) {
      initProducts = initProducts.filter(prod => prod._id !== product._id);
      // only select a single option
    } else if (!canSelectMore) {
      initProducts = [product];
      // can select multiple options
    } else { initProducts.push(product); }
    const currentProducts = { ...state, [id]: initProducts };
    setState(currentProducts);
    setInProgressCart(currentProducts, products);
  };

  return (
    <div className="ProductGroup">
      {products && products.submenus.map(({ _id, isRequired, title, type, options }) =>
        isVisibleProductGroup(options) &&
        // isRequiredProduct(_id, isRequired, options) &&
        (<ProductGroup
          key={_id}
          selectedProducts={state[_id] || []}
          isRequired={isRequired}
          id={_id}
          handleClick={handleProdSelection}
          title={title}
          type={type}
          submenu={options}
        />))}
    </div>
  );
};

export default ProductList;
