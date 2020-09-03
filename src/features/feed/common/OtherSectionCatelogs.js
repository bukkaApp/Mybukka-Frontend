import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import Container from 'Components/container/Container';

import Row from 'Components/grid/Row';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';
import NoResult from '../../../components/not-found/NoResult';
import { useModalContext } from '../../../context/ModalContext';
import { useBusinessContext } from '../../../context/BusinessContext';

const OtherSectionCatelogs = ({
  uniqueCatelogs, searchQuery, isInSearch, hasNoResult, type, activeCatelog, setActiveCatelog
}) => {
  const { catelogs, setCatelogToDisplay } = useBusinessContext();
  const { setModal, setCartPopup } = useModalContext();

  const onSearch = (uniqueCatelog, catelog) => {
    const isUniqueCatelog = eachCatelog => eachCatelog.category === uniqueCatelog;
    if (Array.isArray(catelog)) {
      return catelog.filter(eachCatelog => isUniqueCatelog(eachCatelog) && isInSearch(eachCatelog));
    }
    return isUniqueCatelog(catelog) && isInSearch(catelog);
  };

  const onClick = (slug) => {
    setCatelogToDisplay(slug);
    setCartPopup(true);
    setModal(true);
  };

  return (
    catelogs &&
    <div id="flyout-left-container">
      {uniqueCatelogs.map(eachUniqueCatelog => (
        onSearch(eachUniqueCatelog, catelogs).length > 0 &&
        <Fragment key={`nearby-${type}-catelog-${eachUniqueCatelog}`}>
          <div className="carousel-divider" />
          <Container classNames="px-0">
            <div className="mt-4 mb-4">
              <Headline
                useScroll
                setCurrentTitle={setActiveCatelog}
                currentTitle={activeCatelog || 'categories'}
                title={eachUniqueCatelog}
                activeIndex={1}
              />
              <Container>
                <Row classNames="pb-4">
                  {catelogs.map(catelog => (
                    onSearch(eachUniqueCatelog, catelog) && (
                      <BukkaCard
                        key={`nearby-${type}-${catelog.title.split(' ').join('-')}-${catelog._id}`}
                        imageUrl={catelog.imageUrl}
                        mealName={catelog.title}
                        id={catelog._id}
                        carouselType="category"
                        deliveryPrice={catelog.deliveryCost}
                        imageHeight="fresh-img-height"
                        classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                        handleClick={() => onClick(catelog.slug)}
                      />
                    )
                  ))}
                </Row>
              </Container>
            </div>
          </Container>
        </Fragment>
      ))}
      {hasNoResult() &&
      <Container>
        <NoResult withPadding text={searchQuery} />
      </Container>}
    </div>
  );
};

const mapStateToProps = ({
  cartReducer: { errorMessage },
}) => ({
  errorMessage,
});

export default connect(
  mapStateToProps,
)(OtherSectionCatelogs);

OtherSectionCatelogs.propTypes = {};
