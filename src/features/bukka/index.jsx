import React, { useEffect, Fragment } from 'react';

import fetchCartAction from 'Redux/fetchCartAction';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchBukkaAction from 'Redux/fetchBukkaAction';
import { useModalContext } from '../../context/ModalContext';
import FooterBigScreen from '../../components/footer/FooterBigScreen';
import fetchBukkaMenuAction from '../../redux/fetchBukkaMenuAction';

import Bukka from './components';

const Scene = ({
  cartItemsQuantity, history: { location, push }, fetchBukka,
  fetchBukkaMenu,
  bukkaMenu,
  fetchCartItems,
  authenticated,
}) => {
  const { setViewMoreOrderOnMobile, setModal } = useModalContext();

  const handleClick = () => {
    setModal(true);
    setViewMoreOrderOnMobile(true);
  };

  const isBigScreen = useMediaQuery({ minWidth: 960 });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const bukkaToFetch = location.pathname.split('/')[2];
    if (bukkaMenu[0].bukka !== bukkaToFetch) {
      fetchBukka(bukkaToFetch);
      fetchBukkaMenu(bukkaToFetch);
      if (authenticated) fetchCartItems();
    }
  }, []);

  return (
    <Fragment>
      <Bukka push={push} />
      {!isBigScreen && cartItemsQuantity > 0 &&
      <FooterBigScreen left handleClick={handleClick} text="View Order" qty={cartItemsQuantity} fixed />}
    </Fragment>
  );
};

const mapStateToProps = ({
  productsReducer: { bukkaMenu },
  cartReducer: { items },
  authenticationReducer: { status: { authenticated } },
}) => ({
  bukkaMenu,
  authenticated,
  cartItemsQuantity: items.length,
});


export default connect(
  mapStateToProps,
  {
    fetchBukka: fetchBukkaAction,
    fetchBukkaMenu: fetchBukkaMenuAction,
    fetchCartItems: fetchCartAction
  }
)(Scene);

Scene.defaultProps = {
  history: {
    push: () => {}
  }
};

Scene.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  fetchBukka: PropTypes.func.isRequired,
  fetchBukkaMenu: PropTypes.func.isRequired,
};
