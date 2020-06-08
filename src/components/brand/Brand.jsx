import React from 'react';
import { Link } from 'react-router-dom';
import useHistory from '../../hooks/useHistory';
import Logo from './Logo';
import './brand.scss';

const Brand = () => {
  const { push } = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    push('/');
  };

  return (
    <div>
      <Link onClick={onClick} className="bukka-brand" to="/"><Logo /></Link>
    </div>
  );
};

export default Brand;
