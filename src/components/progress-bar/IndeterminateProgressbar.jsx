import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './progress-bar.scss';

const IndeterminateProgressBar = ({ loading }) => {
  if (loading) {
    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }
  return null;
};

const mapStateToProps = ({ loadingReducer: { status } }) => ({
  loading: status,
});

export default connect(mapStateToProps, {})(IndeterminateProgressBar);

IndeterminateProgressBar.defaultProps = {
  loading: false,
};

IndeterminateProgressBar.propTypes = {
  loading: PropTypes.bool,
};
