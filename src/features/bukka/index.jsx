import React, { useEffect, Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchCartAction from 'Redux/fetchCartAction';
import fetchBukkaAction from 'Redux/fetchBukkaAction';
import { useUserContext } from '../../context/UserContext';
import { useModalContext } from '../../context/ModalContext';
import FooterBigScreen from '../../components/footer/FooterBigScreen';
import fetchBukkaMenuAction from '../../redux/fetchBukkaMenuAction';

import Bukka from './components';

const Scene = ({
  cartItemsQuantity,
  fetchBukka,
  fetchBukkaMenu,
  bukkaMenu,
  fetchCartItems,
}) => {
  const { push, location } = useHistory();
  const { isAuthenticated } = useUserContext();
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const { setViewMoreOrderOnMobile, setModal } = useModalContext();

  const handleClick = () => {
    setModal(true);
    setViewMoreOrderOnMobile(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const bukkaToFetch = location.pathname.split('/')[2];
    if (bukkaMenu[0].bukka !== bukkaToFetch) {
      fetchBukka(bukkaToFetch);
      fetchBukkaMenu(bukkaToFetch);
      if (isAuthenticated) fetchCartItems();
    }
  }, [isAuthenticated]);

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
}) => ({
  bukkaMenu,
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
