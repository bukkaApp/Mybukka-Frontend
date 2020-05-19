import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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

export const ProgressSwitch = () => {
  const [state, dispatch] = useState(false);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    dispatch(true);
    const timeout = setTimeout(() => {
      dispatch(false);
      clearTimeout(timeout);
    }, 300);
  }, [pathname]);

  return <ProgressBar loading={state} />;
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
