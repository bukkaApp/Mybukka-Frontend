import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import Container from 'Components/container/Container';

import Row from 'Components/grid/Row';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';
import setMealToDisplayAction from 'Redux/setMealToDisplayAction';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import { useModalContext } from '../../../context/ModalContext';

const OtherSection = ({
  bukkaMenu,
  categories,
  searchQuery,
  setMealToDisplay,
  type,
}) => {
  const onSearch = (category, items) => {
    const isCategory = item => item.category === category;
    const isInSearch = item => item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return Array.isArray(items) ? items.filter(menu => isCategory(menu) && isInSearch(menu))
      : isCategory(items) && isInSearch(items);
  };

  const { setModal } = useModalContext();
  return (
    <div id="flyout-left-container">
      {categories.map(category => (
        onSearch(category, bukkaMenu).length > 0 &&
        <Fragment key={`nearby-${type}-category-${category.split(' ').join('-')}`}>
          <div className="carousel-divider" />
          <Container classNames="px-0">
            <div className="mt-4 mb-4">
              <Headline title={category} activeIndex={1} />
              <Container>
                <Row classNames="pb-4">
                  {bukkaMenu.map(menu => (
                    onSearch(category, menu) && (
                      <BukkaCard
                        key={`nearby-${type}-${menu.title.split(' ').join('-')}-${menu._id}`}
                        imageUrl={menu.imageUrl}
                        mealName={menu.title}
                        carouselType="category"
                        deliveryPrice={menu.deliveryCost}
                        imageHeight="fresh-img-height"
                        classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                        handleClick={() => {
                          setMealToDisplay(menu.slug, null, true);
                          setModal(true);
                        }}
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
};
const mapStateToProps = ({
  productsReducer: {
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
