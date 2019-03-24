import React from 'react';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';

const Body = ({ quantity, title }) => (
  <Row classNames="justify-content-between">
    <h5 className="text-uppercase font-size-14">{quantity}X  {title} ...</h5>
  </Row>
);

export default Body;

Body.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};
