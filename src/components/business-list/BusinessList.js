import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
// import PropTypes from 'prop-types';

import fetchBukkaAction from 'Redux/fetchBukkaAction';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
// import SmallSpinner from '../spinners/SmallSpinner';
import Row from '../grid/Row';
import Container from '../container/Container';
import BukkaCard from '../Carousel/BukkaCard';
import Map from '../map';
// import { useLocationContext } from '../../context/LocationContext';
import fetchBukkas from '../../features/feed/actionCreators/fetchMoreBukkas';
import { useBusinessContext } from '../../context/BusinessContext';
import { useBusinessesContext } from '../../context/BusinessesContext';
import useApi from '../../shared/api';
import { useBusinessListContext } from '../../context/BusinessListContext';

import './BusinessList.scss';

const Spinner = () => (
  <div className="loader text-center" key={0}>
    <div className="spinner-grow custom-text-color" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

// bukkaData,
// classNames,
// fetchMoreBukkas,
// currentPage,
// errorMessage,
// fetchBukkaMenu,
// fetchBukka,
// onMouseEnter,
// onMouseLeave

const BusinessList = () => {
  const { API } = useApi();
  const { store, setHoveredBusiness } = useBusinessListContext();
  const { setBusiness } = useBusinessContext();
  const { businesses, errorMessage, currentPage, setBusinessesPagination } = useBusinessesContext();

  const hasError = errorMessage !== 'There are currently no bukkas in your location';
  const { push } = useHistory();
  // const { coordinates } = useLocationContext();

  const handleMoreBusiness = () => {
    API.businesses.get(`page=${Number(currentPage) + 1}`)
      .then(res => setBusinessesPagination(res.data));
  };

  const handleRouteToMerchant = (event, bukka) => {
    event.preventDefault();
    API.business.get(bukka.slug)
      .then((res) => {
        setBusiness(res.data);
        API.menus.get(`${bukka.slug}?type=food`)
          .then(() => push(`/bukka/${bukka.slug}`))
          .catch((/* if no menu */) => push(`/bukka/${bukka.slug}`));
      })
      .catch(error => console.error(error));
    // fetchBukkaMenu(`${bukka.slug}`)
    //   .then(() => fetchBukka(bukka.slug))
    //   .then(() => push(`/bukka/${bukka.slug}`));
  };

  const decodeDeliveryTime = (bukka) => {
    if (bukka && bukka.logistics) {
      const maxTime = bukka.logistics.deliveryTimeTo;
      return maxTime > 60 ? maxTime / 60 : maxTime;
    }
    return bukka.deliveryTime;
  };

  const decodeDeliveryPrice = (bukka) => {
    if (bukka && bukka.logistics) {
      return bukka.logistics.deliveryPrice;
    }
    return bukka.deliveryPrice;
  };

  const decodeStoreImage = (bukka) => {
    if (bukka && bukka.headerImg) {
      return bukka.headerImg;
    }
    return bukka.imageUrl;
  };

  return (
    <React.Fragment>
      <div className="Food-Nearby-Wrapper">
        <Container>
          {(businesses && businesses.length > 0) && (
            <InfiniteScroll
              loadMore={handleMoreBusiness}
              hasMore={hasError}
              loader={<Spinner />}
              useWindow
              initialLoad={false}
            >
              <Row classNames="pb-4">
                {businesses.map(bukka => (
                  <BukkaCard
                    key={`business-list-data-card-${bukka.name}-${bukka.slug}-`}
                    imageUrl={decodeStoreImage(bukka)}
                    mealName={bukka.name}
                    tags={bukka.placeGroup}
                    handleClick={e => handleRouteToMerchant(e, bukka)}
                    deliveryPrice={decodeDeliveryPrice(bukka)}
                    deliveryTime={decodeDeliveryTime(bukka)}
                    rating={bukka.rating}
                    imageHeight="img-fluid"
                    classNames="col-12"
                    onMouseEnter={() => setHoveredBusiness(store)}
                    onMouseLeave={() => setHoveredBusiness(null)}
                    href={`/bukka/${bukka.slug}`}
                  />
                ))}
              </Row>
            </InfiniteScroll>)}
        </Container>
      </div>
      <div className="Food-Map-Wrapper">
        <Map zoom={15} useBusinesses />
      </div>
    </React.Fragment>
  );
};

export default connect(
  () => ({}),
  { fetchMoreBukkas: fetchBukkas,
    fetchBukkaMenu: fetchBukkaMenuAction,
    fetchBukka: fetchBukkaAction, }
)(BusinessList);

BusinessList.defaultProps = {
  children: '',
  heading: true,
  title: '',
  handleRefFocus: () => {},
  currentPage: 1,
  errorMessage: '',
  fetchBukkaMenu: () => {},
};

BusinessList.propTypes = {};
// fetchBukkaMenu: PropTypes.func,
// classNames: PropTypes.string.isRequired,
// fetchMoreBukkas: PropTypes.func.isRequired,
// currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// errorMessage: PropTypes.string,
// bukkaData: PropTypes.arrayOf(
//   PropTypes.shape({
//     image: PropTypes.string,
//     deliveryCost: PropTypes.number,
//     deliveryTime: PropTypes.string,
//     rating: PropTypes.string
//   })
// ).isRequired,

