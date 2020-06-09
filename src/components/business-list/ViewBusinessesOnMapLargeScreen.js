import React from 'react';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

// import SmallSpinner from '../spinners/SmallSpinner';
import Row from '../grid/Row';
import Container from '../container/Container';
import BukkaCard from '../Carousel/BukkaCard';
import Map from '../map';
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

const ViewBusinessesOnMap = () => {
  const { API } = useApi();
  const { setHoveredBusiness } = useBusinessListContext();
  const { setBusiness } = useBusinessContext();
  const { businesses, errorMessage, currentPage, setBusinessesPagination } = useBusinessesContext();

  const hasError = errorMessage !== 'There are currently no bukkas in your location';
  const { push } = useHistory();

  const handleMoreBusinesses = () =>
    API.businesses.get(`page=${Number(currentPage) + 1}`)
      .then(res => setBusinessesPagination(res.data));

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
    <section className="Food-Map-Container">
      <div className="Food-Nearby-Wrapper">
        <Container>
          {(businesses && businesses.length > 0) && (
            <InfiniteScroll
              loadMore={handleMoreBusinesses}
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
                    onMouseEnter={() => setHoveredBusiness(bukka)}
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
    </section>
  );
};

export default ViewBusinessesOnMap;

ViewBusinessesOnMap.propTypes = {};
