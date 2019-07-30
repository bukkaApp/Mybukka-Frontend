import React from 'react';

import InputField from 'Components/input/InputField';

import './submenus.scss';

const SubMenus = ({ menus }) => (
  <div className="sub-menus">
    <h5 className="header">SUB MENUS</h5>
    {menus.map(menu => (
      <div className="sub-menu">
        <InputField type="checkbox" defaultValue={menu} classNames="checkbox" />
        <p className="menu-text">{menu}</p>
      </div>
    ))}
  </div>
);

export default SubMenus;
