import React, { Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Map from '../../../components/map';
import Navbar from '../../../components/navbar';
import Container from '../../../components/container';
import Button from '../../../components/button/Button';

import TemporaryWrapper from '../../../components/ViewWrappers/TemporaryWrapper';
import DeliveryAddress from './DeliveryAddress';
import Schedules from './Schedules';
import Demarcation from '../common/SmallScreenDivider';
import Payments from '../../../components/payment';
import ShoppingCart from './ShoppingCart';

import './checkout.scss';

const Checkout = ({ handleCheckout }) => {
  const { goBack } = useHistory();
  const isBigScreen = useMediaQuery({ minWidth: 576 });

  return (
    <Fragment>
      {isBigScreen && <Navbar />}
      {!isBigScreen &&
      <section className={`container ${isBigScreen ? 'mb-2 mt-4' : 'pb-2 pt-4'} Checkout-Heading-Wrapper`}>
        <i tabIndex="0" role="link" onClick={() => goBack()} className="fas fa-arrow-left fa-2x Checkout-Heading-Icon" />
        <TemporaryWrapper.ViewHeading noPadding noFont classNames="Checkout-Heading" text="Checkout" />
      </section>}
      {!isBigScreen &&
      <Container classNames="map-address p-0">
        <Map />
      </Container>}
      <Container classNames="relative modal-open p-0">
        <div className="d-flex flex-column flex-xl-row flex-lg-row flex-md-column justify-content-between">
          <div className="col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3 col-md-12 col-12">
            {isBigScreen && <TemporaryWrapper.ViewHeading noPadding noFont classNames="Checkout-Heading mt-4 mb-2" text="Checkout" />}
            <DeliveryAddress isBigScreen={isBigScreen} />
            <Schedules />
            <section className="mb-2 mt-4">
              <Demarcation />
              <Payments noPadding />
              <Demarcation />
            </section>
            <div className="d-none d-xl-flex d-lg-flex justify-content-end my-5">
              <Button
                type="submit"
                text="CONTINUE"
                classNames="Big-Button"
                handleClick={() => handleCheckout()}
              />
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-5 col-md-12 col-sm-12 mb-2 px-0 px-md-0
              px-lg-3 mt-0 mt-lg-4 mt-xl-4"
          >
            <div className="Imaginery-Card-Section Imagenery-Card--Spacing mb-3">
              {isBigScreen &&
              <div className="map-address d-none d-lg-block d-xl-block">
                <Map />
              </div>}
              <ShoppingCart />
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Checkout;

Checkout.propTypes = {};

Checkout.defaultProps = {};
