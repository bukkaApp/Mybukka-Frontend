import React, { Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import Button from '../button/Button';

import '../common-navs/unaunthenticated-checkout.scss';
import { useLocationContext } from '../../context/LocationContext';
import Footer from '../footer/Footer';

const RequireLocation = ({ to }) => {
  const { coordinates } = useLocationContext();
  const { push, location } = useHistory();

  const emitOnClick = (e) => {
    e.preventDefault();
    const home = location.pathname;
    const currentPage = coordinates.length ? to : `/?next=${home}`;
    push(currentPage);
  };

  return (
    (coordinates.length < 2) &&
    <Fragment>
      <div className="position-relative">
        <Footer />
      </div>
      <div className="modal-root">
        <div className="unaunthenticated-backdrop">
          <div className="unaunthenticated-container">
            <div className="unaunthenticated-content">
              <h2 className="unaunthenticated-heading">
                <span>Catelog will require location</span>
              </h2>
              <p className="unaunthenticated-main-content">
                <span>Your location would help you get nearest product</span>
              </p>
            </div>
            <div direction="row" className="unaunthenticated-footer">
              <Button
                color="#00CC99"
                type="button"
                handleClick={emitOnClick}
                classNames="unaunthenticated-continuation"
              >
                <span>Okay</span>
              </Button>
              <Button
                color="#8F95A3"
                handleClick={emitOnClick}
                classNames="unaunthenticated-cancel"
                type="button"
              >
                <span>Cancel</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RequireLocation;
