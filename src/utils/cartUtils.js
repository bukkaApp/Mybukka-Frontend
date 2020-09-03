const checkArrays = (arrA, arrB) => {
  // check if lengths are different
  if (arrA.length !== arrB.length) return false;
  // slice so we do not effect the original
  // sort makes sure they are in order
  // join makes it a string so we can do a string compare
  const cA = arrA.slice().sort().join(',');
  const cB = arrB.slice().sort().join(',');

  return cA === cB;
};

const isLength = prod => (prod.submenus ? prod.submenus.length : 0);

const hasProducts = (old, dnew) => {
  const isSubmenuInOldItem = isLength(old);
  const isSubmenuInNewItem = isLength(dnew);
  if (isSubmenuInOldItem && isSubmenuInNewItem) {
    return true;
  }
  return false;
};

export const flatArr = (submenus) => {
  if (submenus && submenus.length > 0) {
    return submenus
      .reduce((arr, item) => [...arr, item._id, ...item.options
        .reduce((arr2, itm) => [...arr2, itm._id], [])],
      []);
  }
  return [];
};


export const sortOrdersUpdate = (orders, newOrder) => {
  let isInCart = false;
  if (orders.length === 0) return [newOrder];
  const compressedOrder = orders.map((order) => {
    const isNew = newOrder.submenus, old = order.submenus;
    if (hasProducts(order, newOrder) && checkArrays(flatArr(old), flatArr(isNew))) {
      isInCart = true;
      return { ...order, quantity: order.quantity + 1 };
    }
    return order;
  });
  if (isInCart) return compressedOrder;
  return [...compressedOrder, newOrder];
};


export default { checkArrays, hasProducts, flatArr, sortOrdersUpdate };
