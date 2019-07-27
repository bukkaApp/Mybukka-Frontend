import React, { useEffect } from 'react';

import swal from 'sweetalert';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlertMessage = ({ loading, message }) => {
  useEffect(() => () => swal(message.toUpperCase()), [message]);

  if (loading) {
    return (
      <div />
    );
  }
  return null;
};

const mapStateToProps = ({ alertMessageReducer: { status, message } }) => ({
  loading: status,
  message
});

export default connect(mapStateToProps, {})(AlertMessage);

AlertMessage.defaultProps = {
  loading: false,
  message: '',
};

AlertMessage.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string,
};
