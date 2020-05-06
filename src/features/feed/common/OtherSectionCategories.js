import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import Container from 'Components/container/Container';

import Row from 'Components/grid/Row';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';
import setMealToDisplayAction from 'Redux/setMealToDisplayAction';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';

const OtherSection = ({
  bukkaMenu,
  categories,
  searchQuery,
  setMealToDisplay,
  type,
}) => (
  <div id="flyout-left-container">
    {categories.map(category => (
      <Fragment key={`nearby-${type}-category-${category.split(' ').join('-')}`}>
        <div className="carousel-divider" />
        <Container classNames="px-0">
          <div className="mt-4 mb-4">
            <Headline title={category} activeIndex={1} />
            <Container>
              <Row classNames="pb-4">
                {bukkaMenu.map(menu => (
                  menu.category === category && menu.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                    <BukkaCard
                      key={`nearby-${type}-${menu.title.split(' ').join('-')}-${menu._id}`}
                      imageUrl={menu.imageUrl}
                      mealName={menu.title}
                      carouselType="cuisine"
                      deliveryPrice={menu.deliveryCost}
                      imageHeight="fresh-img-height"
                      classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                      handleClick={() =>
                        setMealToDisplay(menu.slug, null, true)
                      }
                    />
                  )
                ))}
              </Row>
            </Container>
          </div>
        </Container>
      </Fragment>
    ))}
  </div>
);

const mapStateToProps = ({
  fetchBukkaMenuReducer: {
    bukkaMenu,
    categories,
    status: { error, fetched },
  },
  cartReducer: { errorMessage },
}) => ({
  bukkaMenu,
  status,
  categories,
  error,
  fetched,
  errorMessage,
});

export default connect(
  mapStateToProps,
  {
    fetchBukkaMenu: fetchBukkaMenuAction,
    setMealToDisplay: setMealToDisplayAction,
  },
)(OtherSection);

OtherSection.propTypes = {};
