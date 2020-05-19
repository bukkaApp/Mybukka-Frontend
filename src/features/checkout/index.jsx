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

  useEffect(() => {
    const handleOpenWindow = () => {
      const self = window.open(url, '_blank');
      setState(self);
    };
    if (url && url !== '') handleOpenWindow();
    return () => {};
  }, [url]);

  useEffect(() => {
    // User has switched back to the tab
    const onWindowClosed = () => {
      verifyCard(reference);
    };

    onWindowClosed();
    return () => {};
  }, [state]);

  return (
    <Fragment>
      <Checkout
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
