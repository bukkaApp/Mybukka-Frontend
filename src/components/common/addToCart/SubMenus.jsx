import React, { useState } from 'react';
import shortId from 'shortid';
import InputField from 'Components/input/InputField';

import './submenus.scss';
// SUB MENUS

const EachSubMenus = ({ menu, type }) => {
  const [checked, setCheck] = useState(false);
  const isMutipleOptions = type === 'multiple';
  return (
    <div
      className="sub-menu cursor-pointer"
      onClick={() => setCheck(!checked)}
      tabIndex="0"
      aria-pressed="false"
      role="button"
    >
      <InputField
        type={isMutipleOptions ? 'checkbox' : 'radio'}
        defaultValue={menu.name}
        classNames={isMutipleOptions ? 'checkbox' : 'radio'}
        checked={checked}
        // handleChange={() => {}}
      />
      <p className="col-10 menu-text d-flex justify-content-between">
        <span>{menu.name}</span>
        <span className="text-muted">₦{menu.price}</span>
      </p>
    </div>
  );
};

const SubMenus = ({ menus, title, type }) => (
  <div className="sub-menus">
    <h5 className="header text-uppercase">{title}</h5>
    {menus.map(menu => (
      (menu.price && menu.name)
      && <EachSubMenus type={type} key={shortId.generate()} menu={menu} />
    ))}
  </div>
);

export default SubMenus;
