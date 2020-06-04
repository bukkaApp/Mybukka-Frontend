import /* React, */ { PureComponent } from 'react';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';

/**
   * @class Worker
   * @copyright https://web.dev/customize-install/
   * @returns {void} void
   */
class Worker extends PureComponent {
  /**
   * @constructor Worker
   * @param {*} props
   * @returns {void} void
   */
  constructor(props) {
    super(props);
    this.deferredPrompt = '';
    this.state = {
      logs: [],
    };
  }

  /**
   * @memberof Worker
   * @method componentDidMount
   * @returns {void} void
   */
  componentDidMount() {
    this.pushLog('the main JS thread was loaded');

    if (
      'serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    ) {
      const registration = runtime.register();

      registerEvents(registration, {
        onInstalled: () => {
          this.pushLog('onInstalled');
        },
        onUpdateReady: () => {
          applyUpdate().then(() => {
            window.location.reload();
          });
          this.pushLog('onUpdateReady');
        },

        onUpdating: () => {
          this.pushLog('onUpdating');
        },
        onUpdateFailed: () => {
          this.pushLog('onUpdateFailed');
        },
        onUpdated: () => {
          this.pushLog('onUpdated');
        },
        message: () => ({ event: { data: { action: 'skipWaiting' } } })
      });
    } else {
      this.pushLog('serviceWorker not available');
    }
  }

  /**
   * @memberof Worker
   * @method pushLog
   * @param {*} log
   * @returns {void} void
   */
  pushLog(log) {
    this.setState({
      logs: [...this.state.logs, log],
    });
    console.log('worker', log);
  }

  /**
   * @memberof Worker
   * @method render
   * @returns {void} void
   */
  render() {
    return this.props.children;
  }
}

export default Worker;
