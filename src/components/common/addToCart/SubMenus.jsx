import React from 'react';

import InputField from 'Components/input/InputField';

import './submenus.scss';
// SUB MENUS
const SubMenus = ({ menus, title }) => (
  <div className="sub-menus">
    <h5 className="header text-uppercase">{title}</h5>
    {menus.map(menu => (
      (menu.price && menu.name) &&
      <div className="sub-menu">
        <InputField
          type="checkbox"
          defaultValue={menu.name}
          classNames="checkbox"
        />
        <p className="col-10 menu-text d-flex justify-content-between">
          <span>{menu.name}</span>
          <span className="text-muted">{menu.price}</span>
        </p>
      </div>
    ))}
  </div>
);

export default SubMenus;
