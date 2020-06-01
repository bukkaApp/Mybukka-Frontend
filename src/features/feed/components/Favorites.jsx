import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../../../components/container/Container';
import NoResult from '../../../components/not-found/NoResult';
import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';

// col-xl-4 col-md-6 col-sm-12
// TODO: Don't  display time if bukkas are not avaailable or they have closed

const Favorites = () => {
  const { push } = useHistory();

  return (
    <div className="container-fluid p-0">
      <div>
        <IntroSection push={push} />
        <ExploreSection classNames="pt-5">
          <Container classNames="position-sticky top-114">
            <h2 className="place-group-header pt-100 px-15 capitalize pb-3">
              Your Favorites
            </h2>
          </Container>
          <div className="border-top" />
          <Container classNames="position-relative bg-white">
            <NoResult withPadding text={'Your Favorites'} details="Try to add your favorite stores and catelog" />
          </Container>
        </ExploreSection>
      </div>
    </div>
  );
};

export default Favorites;
