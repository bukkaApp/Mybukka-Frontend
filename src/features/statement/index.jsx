import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthModal from 'Components/navbar/common/AuthModal';
import Privacy from './Privacy';

const Index = (props) => {
  const { history: { push } } = props;
  return (
    <Fragment>
      <AuthModal push={push} />
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

