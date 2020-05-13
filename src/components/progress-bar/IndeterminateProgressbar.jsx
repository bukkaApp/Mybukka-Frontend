import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './progress-bar.scss';
import { useLoadingContext } from '../../context/UseLoading';

export const ProgressBar = ({ loading }) => {
  if (loading) {
    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }
  return null;
};


const IndeterminateProgressBar = ({ loading }) => {
  const { status: isLoading } = useLoadingContext();
  return <ProgressBar loading={loading || isLoading} />;
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
