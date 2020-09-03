import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './progress-bar.scss';
import { useLoadingContext } from '../../context/LoadingContext';

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

/**
 * Note: this is manage by react context can be trigger by calling
 *
 * `const { loading } = useLoadingContext();`
 *
 * `loading(true)`
 * @returns {jsx} jsx
 */
export const IndeterminateProgressBarState = () => {
  const { status } = useLoadingContext();
  if (status) {
    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }
  return null;
};

/**
 * @param {props} loading
 * Note: this is manage by Redux context and
 * it's mostly use in the actionCreators.
 * @returns {jsx} jsx
 */
const IndeterminateProgressBar = ({ loading }) => <ProgressBar loading={loading} />;

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
