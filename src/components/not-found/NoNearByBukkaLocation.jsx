import React, { Fragment, useEffect } from 'react';
import Brand from 'Components/brand/Brand';
import Button from 'Components/button/Button';
import Footer from 'Components/footer/Footer';
import Container from '../container';
import Android, { Apple } from '../button/StoreSvg';

import './NoNearByBukkaLocation.scss';

const NoNearByBukkaLocation = ({ history: { push } }) => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Container classNames="my-2">
        <Brand />
      </Container>
      <div className="bg-color pt-4">
        <Container>
          <div className="row">
            <div className="col-lg-6">
              <div className="padding">
                <div className="position-relative mb-5">
                  <h4 className="caption-header">Your online Bukka is here.</h4>
                  <div className="runner no-nearby-bukka-runner" />
                </div>
                {/* paragrgrph */}
              </div>
              <div className="padding">
                <div className="d-flex flex-column flex-lg-row justify-content-around mb-4 mr-md-4 store-button-container">
                  <Button
                    classNames="store-button mb-4 mb-lg-0 w-75"
                    type="button"
                    disabled={false}
                    handleClick={() => push('/store/apple')}
                  >
                    <Apple />
                    <span>APP STORE</span>
                  </Button>

                  <Button
                    classNames="store-button mb-4 mb-lg-0 w-75"
                    type="button"
                    disabled={false}
                    handleClick={() => push('/store/android')}
                  >
                    <Android />
                    <span>PLAY STORE</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block caption-image">
              <div className="">
                <figure className="figure">
                  <img
                    src="https://www.bytestart.co.uk/wp-content/uploads/2018/08/eCommerce-7-Top-tips-600x363.jpg"
                    className="figure-img img-fluid rounded"
                    alt="caption-figure"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="padding">
                <p className="text-justify caption-text">
                  Are you hungry, world? I hope so because Bukka is
                  here to make delivery awesome. No longer confined to the NGN,
                  Bukka is going world-wide in an effort to put the best of food,
                  alcohol, and more at your fingertips. The things you want and need are
                  only one click away. Order online, or download our app from the
                  iTunes store or Google Play store.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
};

export default NoNearByBukkaLocation;

NoNearByBukkaLocation.defaultProps = {
  history: { push: () => {} }
};

