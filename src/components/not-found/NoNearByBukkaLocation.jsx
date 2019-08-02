import React, { Fragment } from 'react';
import Container from '../container';
import Brand from 'Components/brand/Brand';
import Button from 'Components/button/Button.jsx';
import Footer from 'Components/footer/Footer';
import './NoNearByBukkaLocation.css';
import Android, { Apple } from '../button/StoreSvg';

const NoNearByBukkaLocation = ({ history: { push } }) => (
  <Fragment>
    <Container classNames="my-3">
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
              <p className="text-justify caption-text">
              Are you hungry, world? I hope so because Bukka is
              here to make delivery awesome. No longer confined to the NGN,
              Bukka is going world-wide in an effort to put the best of food,
              alcohol, and more at your fingertips. The things you want and need are
              only one click away. Order online, or download our app from the
              iTunes store or Google Play store.
              </p>
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
          <div className="col-lg-6 caption-image">
            <div className="">
              <figure className="figure">
                <img
                  src="https://res.cloudinary.com/mybukka/image/upload/v1564664378/Bukka-iphone-image_ayr65d.png"
                  className="figure-img img-fluid rounded"
                  alt="caption-figure"
                />
              </figure>
            </div>
          </div>
        </div>
      </Container>
    </div>
    <Footer />
  </Fragment>
);

export default NoNearByBukkaLocation;

NoNearByBukkaLocation.defaultProps = {
  history: { push: () => {} }
};

