import React, { Fragment } from 'react';
import Container from '../container';
import Button from 'Components/button/Button.jsx';
import Footer from 'Components/footer/Footer';
import './NoNearByBukkaLocation.css';

export default function NoNearByBukkaLocation() {
  console.log('NoNearByBukkaLocation');
  return (
    <Fragment>
      <div className="bg-color">
        <Container>
          <div className="row padding">
            <div className="col-lg-6">
              <div className="padding">
                <h4>Your online Bukka is here</h4>
                <hr />
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
              <div className="d-flex flex-column flex-md-row mb-4 mr-md-4 text-center">
                <Button
                  text="APPLE STORE"
                  classNames="apple-button"
                  data-testid="button"
                  id="https://itunes.apple.com"
                  type="button"
                  data-target="#authModal"
                  data-toggle="modal"
                  disabled="false"
                />
                <br />
                <Button
                  text="PLAY STORE"
                  classNames="android-button"
                  data-testid="button"
                  id="https://itunes.apple.com"
                  type="button"
                  data-target="#authModal"
                  data-toggle="modal"
                  disabled="false"
                />
              </div>
            </div>
            <div className="col-lg-6 caption-image">
              <div className="">
                <figure class="figure">
                  <img
                    src="https://buyer-static.postmates.com/dist/prod/image-iphonex-es.4dc486237cd3bb173a5410c10475a434f92c09d658faf565d54494f9cc3c18609a584d03c631861df09289e90f6d7a808f6bb006a80ad9281d1156d451ea1e27.png"
                    class="figure-img img-fluid rounded"
                    alt=""
                  />
                  <figcaption class="figure-caption text-xs-right" />
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
