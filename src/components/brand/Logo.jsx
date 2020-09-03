import React from 'react';
import './logo.scss';
import Img from '../img/Img';

const Logo = () => (
  <div className="bukka-logo">
    <Img useBeta className="logo-Opt" options={{ w: 300 }} src="https://res.cloudinary.com/digitzs/image/upload/v1550480450/Bukka%20App/bukka-logo.svg" alt="logo" />
  </div>
);

export default Logo;
