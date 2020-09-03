import React from 'react';
import PropTypes from 'prop-types';
import Paragraph from '../common/Paragraph';

const Foreword = ({ text, children, classNames }) => (
  <Paragraph classNames={classNames}>
    {text || children}
  </Paragraph>
);

export default Foreword;

Foreword.defaultProps = {
  classNames: '',
  children: <div />,
  text: '',
};

Foreword.propTypes = {
  text: PropTypes.string,
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
    PropTypes.array
  ])
};
