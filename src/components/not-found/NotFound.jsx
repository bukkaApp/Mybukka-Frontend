import React from 'react';
import Brand from 'Components/brand/Brand';
import PropTypes from 'prop-types';


import './notavailable.scss';

const NotAvailable = () => (
  <div className="custom-warning-error-bgColor">
    <div className="custom-warning-header">
      <Brand />
    </div>
    <h2 className="custom-warning-text">404</h2>
    <div className="custom-warning-heading">
      <span>Oops. {'There\'s'} nothing here.</span>
    </div>
    <div className="custom-warning-body">
      <span>
            The page no longer exists or the link may be broken.
            But {'don\'t'} worry, you can always return
            from whence you came.
      </span>
    </div>
  </div>
);

export default NotAvailable;

NotAvailable.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
