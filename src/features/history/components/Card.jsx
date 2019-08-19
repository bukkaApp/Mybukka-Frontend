import React from 'react';
import PropTypes from 'prop-types';
import Container from 'Components/container';
import Body from '../card/Body';
import Head from '../card/Head';
import Footer from '../card/Footer';

// eslint-disable-next-line max-len
const Col = ({ children, classNames }) => <div className={`col-md-11 mx-auto ${classNames}`}>{children}</div>;

const Card = ({
  handleClick,
  time,
  orderId,
  mealTitle,
  price,
  status,
  quantity
}) => (
  <div
    className="d-block d-md-block d-xl-none d-lg-none bg-white py-3 mb-3
    cursor-pointer"
    onClick={handleClick}
    role="button"
    data-testid="card-button"
    tabIndex="0"
    aria-pressed
  >
    <Container
      classNames="d-flex-column column mb-2 justify-content-center"
    >
      <Col>
        <Head orderId={orderId} time={time} />
      </Col>
      <hr className="border-line border-box col-12" />
      <Col classNames="pt-1 pb-1">
        <Body quantity={quantity} title={mealTitle} />
      </Col>
      <Col>
        <Footer status={status} price={price} />
      </Col>
    </Container>
  </div>
);

export default Card;

Card.propTypes = {
  handleClick: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  mealTitle: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

Col.defaultProps = {
  classNames: ''
};

Col.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
