import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import verifyCardTransaction from './actionCreators/verifyCardTransaction';
import Checkout from './components/Checkout';

const CheckoutPage = ({
  reference,
  url,
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
      <Checkout />
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
  { verifyCard: verifyCardTransaction }
)(CheckoutPage);

CheckoutPage.propTypes = {};
