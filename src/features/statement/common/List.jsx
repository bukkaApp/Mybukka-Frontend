import React from 'react';
import PropTypes from 'prop-types';

export const UnOrderList = ({ children, classNames }) => (
  <ul className={classNames}>
    {children}
  </ul>
);

export const OrderList = ({ children, classNames }) => (
  <ol className={classNames}>
    {children}
  </ol>
);

export const ListItem = ({ children, classNames }) => (
  <li className={classNames}>
    {children}
  </li>
);

const List = ({ children, type, classNames }) => (
  type === 'number'
    ? <OrderList classNames={classNames}>{children}</OrderList>
    : <UnOrderList classNames={classNames}>{children}</UnOrderList>
);

export default List;

List.defaultProps = {
  type: 'unorder',
  classNames: '',
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  type: PropTypes.string,
  classNames: PropTypes.string,
};

UnOrderList.defaultProps = {
  classNames: '',
};

UnOrderList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  classNames: PropTypes.string
};

OrderList.defaultProps = {
  classNames: '',
};

OrderList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  classNames: PropTypes.string,
};

ListItem.defaultProps = {
  classNames: '',
};

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  classNames: PropTypes.string,
};
