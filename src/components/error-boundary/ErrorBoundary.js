import React from 'react';

import InternalError from '../not-found/InternalError';

/**
 * @class ErrorBounadry
 */
class ErrorBoundary extends React.Component {
  /** @memberof ErrorBounadry
     * @param {*} props
     */
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  /** @memberof ErrorBounadry
     * @param {*} error
     * @param {*} errorInfo
     * @returns {void}
     */
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  /** @memberof ErrorBounadry
     * @returns {void}
     */
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <InternalError minimal={this.props.minimal} history={this.props}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </InternalError>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
