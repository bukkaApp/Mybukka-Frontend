import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../../components/container/Container';
import NoResult from '../../components/not-found/NoResult';
import IntroSection from '../feed/common/IntroSection';
import ExploreSection from '../feed/common/ExploreSection';
import useApi from '../../shared/api';
import { useUserContext } from '../../context/UserContext';

// col-xl-4 col-md-6 col-sm-12
// TODO: Don't  display time if bukkas are not avaailable or they have closed

const History = () => {
  const { push } = useHistory();
  const { API } = useApi();
  const { setHistory, isAuthenticated } = useUserContext();

  useEffect(() => {
    API.history.get()
      .then(res => setHistory(res.data))
      .catch(() => setHistory(null));
  }, [isAuthenticated]);

  return (
    <div className="container-fluid p-0">
      <div>
        <IntroSection push={push} />
        <ExploreSection classNames="pt-5">
          <Container classNames="position-sticky top-114">
            <h2 className="place-group-header pt-100 px-15 capitalize pb-3">
              Your History
            </h2>
          </Container>
          <div className="border-top" />
          <Container classNames="position-relative bg-white">
            <NoResult withPadding text={'Your History'} details="Your order will appear here when you've placed an order" />
          </Container>
        </ExploreSection>
      </div>
    </div>
  );
};

export default History;
