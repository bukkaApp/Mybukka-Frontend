/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import lodash from 'lodash';

const isArrayEqual = function doSomething(x, y) {
  return lodash(x).differenceWith(y, lodash.isEqual).isEmpty();
};

// const isAvailable = menus.filter(menu => isArrayEqual(menu.submenus, item.submenus));
// const checker = menus.filter(menu => lodash.every(menu.submenus, item.submenus));
// const isArr = menus.filter(menu => lodash.filter(menu.submenus, item.submenus));

const loopThroughMenus = (menus, otherMenu) => {
  const arr = [];
  for (let i = 0; i < menus.length; i++) {
    for (let k = 0; k < otherMenu.length; k++) {
      if (menus[i]._id === otherMenu[k]._id) {
        arr.push(otherMenu[k]);
      }
    }
  }
  return arr;
};

const deepFilterSubMenus = (menus, otherMenu) => {
  const newSubmenu = [];
  menus.map((eachMenu) => {
    otherMenu.map((eachItem) => {
      const option = loopThroughMenus(eachMenu.options, eachItem.options);
      if (option.length === eachMenu.options.length) {
        newSubmenu.push(eachItem);
      }
    });
  });
  return newSubmenu;
};

const handleSubmenusPrice = (submenus, quantity) =>
  submenus.map(eachItem => ({
    ...eachItem,
    options: eachItem.options.map(option => ({
      ...option,
      price: option.price * quantity
    }))
  }));

const handleOrderQuantity = (menus, item) => {
  let total = 0;
  const menufound = menus.find(menu => menu._id === item._id);
  if (!menufound) return null;
  const OneMenuFound = menufound.length === 1;
  if (OneMenuFound && menufound[0].submenus.length === 0 && item.submenus.length === 0) return null;
  const submenusFound = loopThroughMenus(menufound.submenus, item.submenus);
  if (item.submenus.length !== submenusFound.length) return null;
  const result = deepFilterSubMenus(submenusFound, item.submenus);
  if (result.length !== submenusFound.length) return null;
  const menuToReturn = menus.map((menu) => {
    if (menu._id === item._id) {
      const menuQuantity = menu.quantity + 1;
      total += menuQuantity * menu.price;
      const submenus = handleSubmenusPrice(menu.submenus, menuQuantity);
      return {
        ...menu,
        submenus,
        price: total,
        quantity: menu.quantity + 1,
      };
    }
    return menu;
  });
  return menuToReturn;
};

export default handleOrderQuantity;
