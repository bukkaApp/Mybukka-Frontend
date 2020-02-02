import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from 'Components/container';
import manipulateCardDetailsAction from 'Redux/manipulateCardDetailsAction';
import getUserCard from '../actionCreators/getUserCard';

import { validateAFieldPayment, validateAllFieldsPayment } from '../validation/validateField';
import Demarcation from '../common/SmallScreenDivider';
import Card, { AddCard } from './Card';
import setDefaultCard from '../actionCreators/setDefaultCard';

import './payment.scss';

const Payment = ({
  manipulateCardDetails,
  handleClick,
  fetchUserCard,
  cards,
  setCardAsDefault,
  status,
  isCardSaved,
  openNewWindow,
}) => {
  const [active, setActive] = useState(false);
  const [prefix, onPrefix] = useState(false);
  const [addCard, showCardForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    number: '',
    expDate: '',
    cvv: '',
  });

  const [inputData, setInputData] = useState({
    number: '',
    expDate: '',
    cvv: '',
  });

  const handleExpDate = (value, data) => {
    if (value.length === 2 && !prefix) {
      onPrefix(true);
      return { expDate: `${value.slice(0, 2)}/${value.slice(2)}` };
    } if (value.length < 2 && prefix) {
      onPrefix(false);
    } return data;
  };

  const handleChange = ({ target: { name, value } }) => {
    let newFieldData = { [name]: value };
    const validation = validateAFieldPayment(newFieldData, name);
    if (name === 'expDate') {
      newFieldData = handleExpDate(value, newFieldData);
    }
    setInputData({
      ...inputData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const manipulateCard = () => {
    const { expDate, cvv, number } = inputData;
    const cardValidityDates = expDate ? expDate.split('/') : ['', ''];
    return {
      cvv,
      number: number.split(' ').join(''),
      expiry_month: cardValidityDates[0],
      expiry_year: cardValidityDates[1],
    };
  };

  const handleSaveButton = (event) => {
    event.preventDefault();
    const { passes, errors } = validateAllFieldsPayment(inputData);

    setValidationErrors({
      ...validationErrors,
      ...errors
    });
    if (passes && !active) {
      manipulateCardDetails(inputData);
      handleClick({ card: { ...manipulateCard() }, amount: 100 });
      setActive(true);
    }
  };

  const handleDefaultSelection = async (id) => {
    await setCardAsDefault(id);
    await fetchUserCard();
  };

  useEffect(() => {
    showCardForm(false);
    fetchUserCard();
  }, [isCardSaved]);

  useEffect(() => {
    fetchUserCard();
  }, []);

  useEffect(() => {
    setActive(false);
  }, [status]);

  return (
    <section className="mb-2 mt-4">
      <Demarcation />
      <Container classNames="p-0">
        <h2 className="font-size-16 px-3 px-md-3 px-lg-0">Payment</h2>
        <form className="border padding-20 mt-4" action="">
          {!addCard && cards.length > 0 ?
            <div>
              <p>Your credits card</p>
              { cards.map(card => (
                <Card
                handleClick={() => handleDefaultSelection(card._id)} // eslint-disable-line
                  selected={card.selected}
                  last4={card.last4}
                  expiredYear={card.exp_year}
                  expiredMonth={card.exp_month}
                  cardType={card.card_type}
                />))}
              <div
                onKeyDown={() => {}}
                role="button"
                aria-pressed="false"
                tabIndex="0"
                onClick={() => showCardForm(true)}
                className="text-muted cursor-pointer my-3"
              >+ add card</div>
            </div>
            : <AddCard
              handleChange={handleChange}
              cards={cards}
              inputData={inputData}
              active={active}
              openNewWindow={openNewWindow}
              handleSaveButton={handleSaveButton}
              handleClick={() => showCardForm(false)}
              validationErrors={validationErrors}
            />
          }
        </form>
      </Container>
      <Demarcation />
    </section>
  );
};

const mapStateToProps = ({
  getUserCardReducer: { cards },
  chargeUserReducer: {
    data: { status }
  },
  saveUserCardReducer: {
    newPayment: { card: isCardSaved },

  },
}) => ({
  cards,
  status,
  isCardSaved,
});

export default connect(
  mapStateToProps,
  { manipulateCardDetails: manipulateCardDetailsAction,
    fetchUserCard: getUserCard,
    setCardAsDefault: setDefaultCard,
  }
)(Payment);

Payment.defaultProps = {
  isCardSaved: {},
  cards: [{}],
  status: '',
};

Payment.propTypes = {
  manipulateCardDetails: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  fetchUserCard: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  setCardAsDefault: PropTypes.func.isRequired,
  status: PropTypes.string,
  isCardSaved: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])),
};
