/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';

import InputField from 'Components/input/InputField';

import './submenus.scss';

const Options = ({ menus, setOption, option }) => (
  <div className="sub-menus">
    <h5 className="header col-11 px-0">CHOOSE ONE</h5>
    {menus.map(menu => (
      <div className="sub-menu">
        <InputField
          type="radio"
          handleChange={() => setOption(menu)}
          value={menu}
          checked={option === menu}
          classNames="radio"
        />
        <p
          className="menu-text"
          aria-pressed="false"
          tabIndex="0"
          role="button"
          onClick={() => setOption(menu)}
        >{menu}</p>
      </div>
    ))}
  </div>
);

export default Options;
