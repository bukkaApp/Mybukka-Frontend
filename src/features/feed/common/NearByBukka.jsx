import React from 'react';

import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import PropTypes from 'prop-types';

const NearByBukka = ({
  bukkaData,
  title,
  classNames,
  imageHeight,
  children,
  handleRefFocus,
}) => {
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
    <div className="pt-4 mb-4">
      {title && <Headline handleRefFocus={handleRefFocus} title={title} activeIndex={1} />}
      {children}
      <Container classNames="container-padding">
        {bukkaData.length > 0 && (
          <Row classNames="pb-4">
            {bukkaData.map(bukka => (
              <BukkaCard
                key={`nearBy-Bukka-${bukka.title}-${bukka._id}`}
                imageUrl={decodeStoreImage(bukka)}
                mealName={bukka.title}
                deliveryPrice={decodeDeliveryPrice(bukka)}
                deliveryTime={decodeDeliveryTime(bukka)}
                rating={bukka.rating}
                imageHeight={imageHeight}
                classNames={classNames}
                dataTarget="#mealModal"
                dataToggle="modal"
              />
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default NearByBukka;

NearByBukka.defaultProps = {
  children: '',
  heading: true,
  title: '',
  handleRefFocus: () => {},
  props: ''
};

NearByBukka.propTypes = {
  handleRefFocus: PropTypes.func,
  title: PropTypes.string,
  classNames: PropTypes.string.isRequired,
  imageHeight: PropTypes.string.isRequired,
  bukkaData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      deliveryCost: PropTypes.number,
      deliveryTime: PropTypes.string,
      rating: PropTypes.string
    })
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
