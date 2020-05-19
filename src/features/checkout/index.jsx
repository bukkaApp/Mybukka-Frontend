import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import logOut from 'Components/navbar/actionCreators/logOut';
import AuthenticatedPages from 'Components/HOC/AuthenticatedPages';

import PropTypes from 'prop-types';
import verifyCardTransaction from './actionCreators/verifyCardTransaction';
import Checkout from './components/Checkout';

const CheckoutPage = ({
  reference,
  url,
  history: { push },
  verifyCard,
}) => {
  const [state, setState] = useState({ closed: false });

  const handleOpenWindow = () => {
    const self = window.open(url, '_blank');
    setState(self);
  };

  // User has switched back to the tab
  const onWindowClosed = () => {
    verifyCard(reference);
  };

  useEffect(() => {
    if (url && url !== '') {
      handleOpenWindow();
    }
    return () => {};
  }, [url]);

  useEffect(() => {
    onWindowClosed();
    return () => {};
  }, [state]);

  return (
    <Fragment>
      <Checkout
        openNewWindow={handleOpenWindow}
        push={push}
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  authenticationReducer: {
    status: { authenticated }
  },
  chargeUserReducer: {
    data: { reference, url }
  },
}) => ({
  authenticated,
  reference,
  url
});

export default connect(mapStateToProps,
  { signOut: logOut,
    verifyCard: verifyCardTransaction }
)(AuthenticatedPages(CheckoutPage));

CheckoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired
};
