import React, { Fragment } from 'react';
import Container from '../container';
import Button from 'Components/button/Button.jsx';
import Footer from 'Components/footer/Footer';
import './NoNearByBukkaLocation.css';
import Android, { Apple } from '../button/StoreSvg';

export default function NoNearByBukkaLocation({ push }) {
  return (
    <Fragment>
      <div className="bg-color">
        <Container>
          <div className="row">
            <div className="col-lg-6">
              <div className="padding">
                <h4 className="caption-header">Your online Bukka is here.</h4>
                <div className="runner no-nearby-bukka-runner" />
                <p className="text-justify caption-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  suscipit fugiat alias cum tenetur provident sapiente,
                  officiis, ipsa natus a voluptatem molestiae eum! Inventore
                  illo tenetur recusandae. Aspernatur quas dignissimos sit esse,
                  perspiciatis architecto earum natus inventore iusto expedita
                  nulla. Suscipit, numquam. Illum expedita minima molestiae quis
                  maiores inventore rerum?
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
                    src="https://buyer-static.postmates.com/dist/prod/image-iphonex-es.4dc486237cd3bb173a5410c10475a434f92c09d658faf565d54494f9cc3c18609a584d03c631861df09289e90f6d7a808f6bb006a80ad9281d1156d451ea1e27.png"
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
}
