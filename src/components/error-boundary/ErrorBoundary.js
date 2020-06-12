import React, { Component } from 'react';

import InternalError from '../not-found/InternalError';

/**
 * @class ErrorBounadry
 */
class ErrorBoundary extends Component {
  /**
     * @memberof ErrorBounadry
     * @param {*} props
     */
  constructor(props) {
    super(props);
    this.history = { push: () => {} };
    this.state = { hasError: false };
  }

  /**
     * @memberof ErrorBounadry
     * @param {*} error
     * @returns {void}
     */
  componentDidMount() {
    const { history } = this.props;
    console.log('history', history);
    if (history) this.history = history;
  }

  /**
     * @memberof ErrorBounadry
     * @param {*} error
     * @returns {void}
     */
  static getDerivedStateFromError(/* error */) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
     * @memberof ErrorBounadry
     * @param {*} error
     * @param {*} errorInfo
     * @returns {void}
     */
  static componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  /**
     * @memberof ErrorBounadry
     * @returns {void}
     */
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
    //   return <h1>Something went wrong.</h1>;
      return <InternalError history={this.history} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
