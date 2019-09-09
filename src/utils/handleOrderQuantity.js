/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import lodash from 'lodash';

const isArrayEqual = function doSomething(x, y) {
  return lodash(x).differenceWith(y, lodash.isEqual).isEmpty();
};

/**
 * @function flattenObjectArray
 * @param {*} submenus { '7373hfj': ['123eeerrr', 'ieeuue8338'] }
 * @returns {arr} arr ['123eeerrr', 'ieeuue8338', '7373hfj']
 */
const flatObjectToArray = (submenus) => {
  const submenusArr = [];
  const submenuKeys = Object.keys(submenus);
  submenuKeys.map((eachSubmenu) => {
    if (submenus[eachSubmenu]) {
      submenusArr.push(submenus[eachSubmenu]);
    }
  });
  return submenusArr.flat().concat(submenuKeys);
};

/**
 * @function loopNewItem
 * @param {*} dSubmenus
 * @returns {arr} arr
 * @example final result return an array ['123eeerrr', 'ieeuue8338', '7373hfj']
 * submenus will return {'7373hfj': ['123eeerrr', 'ieeuue8338']}
 */
const loopNewItem = (dSubmenus) => {
  const submenus = {};
  for (let i = 0; i < dSubmenus.length; i++) {
    if (!submenus[dSubmenus[i]._id]) {
      submenus[dSubmenus[i]._id] = [];
    }
    for (let j = 0; j < dSubmenus[i].options.length; j++) {
      submenus[dSubmenus[i]._id].push(dSubmenus[i].options[j]._id);
    }
  }
  return flatObjectToArray(submenus);
};

const _isArrayEqual = (firstArr, secondArr) => {
  const arr = [];
  for (let i = 0; i < firstArr.length; i++) {
    for (let k = 0; k < secondArr.length; k++) {
      if (firstArr[i] === secondArr[k]) {
        arr.push(firstArr[i]);
      }
    }
  }
  if (arr.length === secondArr.length && isArrayEqual(arr, secondArr)) return true;
  return false;
};

const createMenuData = (menus, index) => menus.map((menu, indx) => {
  if (indx === index || menu._id === index) {
    const menuQuantity = menu.quantity + 1;
    return {
      ...menu,
      quantity: menuQuantity,
    };
  }
  return menu;
});

const handleData = (menus, item) => {
  let index = null;
  const newItem = loopNewItem(item.submenus);
  const menufound = menus.filter(menu => menu._id === item._id);
  if (menufound.length <= 0) return null;
  const OneMenuFound = menufound.length === 1;
  if (OneMenuFound && menufound[0].submenus.length === 0
    && item.submenus.length === 0) {
    return createMenuData(menus, item._id);
  }
  menus.map((menu, indx) => {
    if (menu._id === item._id) {
      const currentItem = loopNewItem(menu.submenus);
      if (newItem.length === currentItem.length
        && _isArrayEqual(newItem, currentItem)) {
        index = indx;
      }
    }
  });
  if (index >= 0 && index !== null) {
    return createMenuData(menus, index);
  }
  return null;
};

export default handleData;
