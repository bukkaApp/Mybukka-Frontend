import React from 'react';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Row from '../grid/Row';
import Container from '../container/Container';
import BukkaCard from '../Carousel/BukkaCard';
import Headline from '../Carousel/Headline';
import Map from '../map';
import { useBusinessContext } from '../../context/BusinessContext';
import { useBusinessesContext } from '../../context/BusinessesContext';
import { useLoadingContext } from '../../context/LoadingContext';
import useApi from '../../shared/api';

import './BusinessList.scss';

const Spinner = () => (
  <div className="loader text-center" key={0}>
    <div className="spinner-grow custom-text-color" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const BusinessList = () => {
  const { API } = useApi();
  const { setBusiness, setCatelogs } = useBusinessContext();
  const { loading } = useLoadingContext();
  const { businesses, errorMessage, currentPage, setBusinessesPagination } = useBusinessesContext();

  const hasError = errorMessage !== 'There are currently no bukkas in your location';
  const { push } = useHistory();

  const handleMoreBusinesses = () => {
    API.businesses.get(`page=${Number(currentPage) + 1}`)
      .then(res => setBusinessesPagination(res.data))
      .catch((err) => {
        const isError = true;
        const data = err.response ? err.response.data : err;
        setBusinessesPagination(data, isError);
      });
  };

  const onLinkToMerchant = (event, bukka) => {
    event.preventDefault();
    loading(true);

    const onCatelogsResponse = (data, isError) => {
      loading(false);
      if (!isError) setCatelogs(data);
      else setCatelogs(data.response ? data.response.data : data, isError);
      push(`/bukka/${bukka.slug}`);
    };

    API.business.get(bukka.slug)
      .then((res) => {
        setBusiness(res.data);
        API.catelogs.get(`${bukka.slug}?type=food`)
          .then(res => onCatelogsResponse(res.data))
          .catch(err => onCatelogsResponse(err, true));
      })
      .catch(error => loading(!error));
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
    <section className="container px-0">
      <div className="mt-5">
        <Headline title="Nearby" activeIndex={1} />
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
                    handleClick={e => onLinkToMerchant(e, bukka)}
                    deliveryPrice={decodeDeliveryPrice(bukka)}
                    deliveryTime={decodeDeliveryTime(bukka)}
                    rating={bukka.rating}
                    imageHeight="img-fluid"
                    classNames="col-xl-4 col-md-6 col-sm-12"
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

export default BusinessList;

BusinessList.propTypes = {};
