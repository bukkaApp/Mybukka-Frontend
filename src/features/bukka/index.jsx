import React, { useEffect, Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchCartAction from 'Redux/fetchCartAction';
import fetchBukkaAction from 'Redux/fetchBukkaAction';
import { useUserContext } from '../../context/UserContext';
import { useModalContext } from '../../context/ModalContext';

import { useBusinessContext } from '../../context/BusinessContext';
import useApi from '../../shared/api';
import { useLoadingContext } from '../../context/LoadingContext';


import FooterBigScreen from '../../components/footer/FooterBigScreen';
import fetchBukkaMenuAction from '../../redux/fetchBukkaMenuAction';
import { useBusinessListContext } from '../../context/BusinessListContext';

import Bukka from './components';

const fetched = { catelogs: false, business: false };

const Scene = ({
  cartItemsQuantity,
  // fetchBukka,
  // fetchBukkaMenu,
  // bukkaMenu,
  fetchCartItems,
}) => {
  const { push, location } = useHistory();
  const { API } = useApi();
  const { isAuthenticated } = useUserContext();
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const { loading } = useLoadingContext();
  const { setBusiness, setCatelogs } = useBusinessContext();
  const { setViewMoreOrderOnMobile, setModal } = useModalContext();
  const { setHoveredBusiness } = useBusinessListContext();

  const handleClick = () => {
    setModal(true);
    setViewMoreOrderOnMobile(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loading(true);

    // retrieve business id from the url
    const businessId = location.pathname.split('/')[2];

    const onResponse = (res, type, hasError = false) => {
      fetched[type] = true;
      const data = hasError ? (res.response.data || res) : res.data;
      if (type === 'catelogs') setCatelogs(data, hasError);
      if (type === 'business') setBusiness(data, hasError);
      if (type === 'business' && !hasError) setHoveredBusiness(data.fetchedBukka);
      if (fetched.catelogs && fetched.business) {
        loading(false);
      }
    };

    const getBusinessInformation = () => {
      API.business.get(businessId)
        .then(res => onResponse(res, 'business'))
        .catch(error => onResponse(error, 'business', true));
    };

    const getBusinessCatelogs = () => {
      API.catelogs.get(`${businessId}?type=food`)
        .then(res => onResponse(res, 'catelogs'))
        .catch(error => onResponse(error, 'catelogs', true));
    };

    // TODO: fetchCart on Login in
    if (isAuthenticated) fetchCartItems();

    getBusinessInformation();
    getBusinessCatelogs();

    return () => setHoveredBusiness(null);
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
  cartReducer: { items },
}) => ({
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
  // fetchBukka: PropTypes.func.isRequired,
  // fetchBukkaMenu: PropTypes.func.isRequired,
};
