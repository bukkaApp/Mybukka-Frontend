import React from 'react';

import PropTypes from 'prop-types';

import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';
import Container from 'Components/container';

import {
  operationHoursHeaderDom,
  rowClassNames,
  operationDetailsDom
} from './domStructure.json';

import './bukkaInfoDropdown.scss';

const OperationHoursBody = ({ operationHoursBodyDetails }) => (
  <Row classNames="operation-hour-details">
    {operationHoursBodyDetails.map(data => (
      <Column classNames={data.columnClassName} key={data.id}>
        <h4 className={data.textClassName}>{data.text}</h4>
      </Column>
    ))}
  </Row>
);

const OperationHoursHeader = ({
  operationHoursHeaderDetails,
  rowClassName
}) => (
  <Row classNames={rowClassName}>
    {operationHoursHeaderDetails.map(headerData => (
      <Column classNames={headerData.columnClassName} key={headerData.id}>
        <h4 className={headerData.textClassName}>{headerData.text}</h4>
      </Column>
    ))}
  </Row>
);

const BukkaInfoDropdownSection = () => (
  <Container classNames="operation-hours-section">
    <OperationHoursHeader
      operationHoursHeaderDetails={operationHoursHeaderDom}
      rowClassName={rowClassNames.header}
    />
    <OperationHoursBody operationHoursBodyDetails={operationDetailsDom} />
  </Container>
);

export default BukkaInfoDropdownSection;

OperationHoursBody.propTypes = {
  operationHoursBodyDetails: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired
};

OperationHoursHeader.defaultProps = {
  rowClassName: ''
};

OperationHoursHeader.propTypes = {
  operationHoursHeaderDetails: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired,
  rowClassName: PropTypes.string,
};
