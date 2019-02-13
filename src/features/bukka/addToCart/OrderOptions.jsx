import React from 'react';
import PropTypes from 'prop-types';
import Column from 'Components/grid/Column';

import Cancel from 'Components/icons/Cancel';

import SpecialInstructions from './SpecialInstructions';
import ActionSection from './ActionSection';
import { MealTitle, MealDescription } from '../components/MealCard';

import './orderOptions.scss';

const OrderOptions = ({ title, description }) => (
  <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-5 order-options-section">
    <div
      data-dismiss="modal"
      className="dismiss-modal-options d-none d-lg-block"
    >
      <Cancel />
    </div>
    <div className="options-details">
      <MealTitle title={title} />
      <MealDescription description={description} />
      <SpecialInstructions />
    </div>
    <ActionSection price={13} handleClick={() => {}} />
  </Column>
);

export default OrderOptions;

OrderOptions.defaultProps = {
  description: ''
};

OrderOptions.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};
