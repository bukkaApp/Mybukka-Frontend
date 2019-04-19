import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './brand.scss';

const Brand = () => (
  <div>
    <Link className="bukka-brand" to="/"><Logo /></Link>
  </div>
);

export default Brand;
