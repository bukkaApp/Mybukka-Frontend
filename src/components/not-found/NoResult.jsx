import React from 'react';
import Magnifier from '../icons/Magnifier';
import './NoResult.scss';

const NoResult = ({ text = 'carnepol', withPadding, details }) => (
  <section className={`NoResult ${withPadding && 'NoResult--withPadding'}`}>
    <Magnifier />
    <div className="NoResult-desc">
      <h2>No results found for &quot;{text}&quot;</h2>
      <p>{details || 'Please make sure your words are spelled correctly or try searching for something else'}.</p>
    </div>
  </section>
);

export default NoResult;
