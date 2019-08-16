import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ModalRoot from '../modal-root/Index';
import Privacy from './Privacy';

const Index = (props) => {
  const { history: { push } } = props;
  return (
    <Fragment>
      <ModalRoot push={push} />
      <Privacy {...props} />
    </Fragment>
  );
};

export default Index;


Index.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

