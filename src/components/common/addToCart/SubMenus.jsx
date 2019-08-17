import React, { useState } from 'react';
import shortId from 'shortid';
import InputField from 'Components/input/InputField';

import './submenus.scss';
// SUB MENUS

const EachSubMenus = ({ menu }) => {
  const [checked, setCheck] = useState(false);

  return (
    <div
      className="sub-menu cursor-pointer"
      onClick={() => setCheck(!checked)}
      tabIndex="0"
      aria-pressed="false"
      role="button"
    >
      <InputField
        type="checkbox"
        defaultValue={menu.name}
        classNames="checkbox"
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

const SubMenus = ({ menus, title }) => (
  <div className="sub-menus">
    <h5 className="header text-uppercase">{title}</h5>
    {menus.map(menu => (
      (menu.price && menu.name)
      && <EachSubMenus key={shortId.generate()} menu={menu} />
    ))}
  </div>
);

export default SubMenus;
