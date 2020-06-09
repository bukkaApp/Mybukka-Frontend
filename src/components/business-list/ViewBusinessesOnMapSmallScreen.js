import React from 'react';
import Container from '../container/Container';
import Carousel from '../Carousel/Carousel';
import Map from '../map';
import { useBusinessesContext } from '../../context/BusinessesContext';

import './ViewBusinessesOnMapSmallScreen.scss';

const ViewBusinessesOnMapSmallScreen = () => {
  const { businesses, } = useBusinessesContext();

  return (
    <section className="Food-Map-Small-Container">
      <div className="Food-Map-Wrapper">
        <Map zoom={15} useBusinesses />
      </div>
      <div>
        <Container>
          {(businesses && businesses.length > 0) && (
            <Carousel
              container="container-padding"
              delivery
              noOfImagesShown={3}
              xl={3}
              lg={2}
              md={2}
              sm={1}
              slideItems={businesses}
              controlClassNames="custom-mt-minus22"
              imageHeight="img-fluid"
              classNames="col-xl-4 col-md-6 col-sm-11 col-11"
            />)}
        </Container>
      </div>
    </section>
  );
};

export default ViewBusinessesOnMapSmallScreen;

ViewBusinessesOnMapSmallScreen.propTypes = {};
