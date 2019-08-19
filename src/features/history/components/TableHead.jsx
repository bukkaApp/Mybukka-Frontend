import React from 'react';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const Col = ({ children }) => <div className="col-2 pt-1 pb-1 custom-border bold">{children}</div>;

const TableHead = () => (
  <Row classNames="flex d-xl-flex d-lg-flex d-md-none d-none">
    <Col>Status</Col>
    <Col>PickUp</Col>
    <Col>DropOff</Col>
    <Col>Order</Col>
    <Col>Price</Col>
    <Col>Courier</Col>
  </Row>
);

export default TableHead;

TableHead.propTypes = {};


Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

