import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PrimaryNavbar from '../../components/navbar/PrimaryNavbar';
import { Route, matchPath } from 'react-router-dom';
import Statement from './component/Statement';

const Index = (props) => {
  const match = props.match;
  const pathMatch = matchPath(props.location.pathname, { path: '/legal/:id' });
  const activePages = { privacy: 'Privacy Policy', terms: 'Terms of Service' };
  return (
    <Fragment>
      <section className="border-bottom">
        <PrimaryNavbar authButton />
      </section>
      <Route path={`${match.path}`}>
        <Statement
          activePage={activePages[pathMatch.params.id]}
          data={import(`./inputData/${pathMatch.params.id}.js`).then(pageContent => pageContent.default)}
        />
      </Route>
    </Fragment>
  );
};

export default Index;


Index.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

