import React, { Fragment, useEffect, useState, Suspense } from 'react';
import { unstable_scheduleCallback as defer, unstable_ImmediatePriority } from 'scheduler';
import PropTypes from 'prop-types';
import Loader from 'Components/loader/Loader';
import Container from 'Components/container';
import Footer from 'Components/footer/Footer';
import UnselectableHeading from '../common/UnSelectableHeading';
import LastUpdated from '../common/LastUpdated';
import Foreword from '../common/Forewords';
import PrivacyScope from '../common/Scope';
import Paragraph from '../common/Paragraph';
import Content from './Content';
import SeceondaryNavbar from '../common/SecondaryNavbar';

import './statement.scss';

const Statement = ({ data, activePage }) => {
  useEffect(() => scrollTo(0, 0), []);
  const [content, setContent] = useState('');

  // get promised data value [[promiseValue]]
  useEffect(() => {
    defer(unstable_ImmediatePriority,
      () => data.then(jsonData => setContent(jsonData)));
  }, [data]);

  return (
    <Suspense fallback={<Loader />}>
      {Object.keys(content).length > 0 &&
      <Fragment>
        <SeceondaryNavbar activePage={activePage} />
        <Container classNames="custom-container">
          <UnselectableHeading
            font="font-size96"
            classNames="my-5 pb-5 px-0 mx-0"
            text={content.title}
          />
          <LastUpdated classNames="mx-0" text={content.lastUpdated} />
          <Foreword
            classNames="short-text text-custom-dark forewords"
          >
            {content.bold ? <strong className="font-18x">{content.forewords}</strong>
              : content.forewords}{' '}
            {content.forewordConclusion || ''}
          </Foreword>
          {content.further && content.further.map(eachData =>
            (<Paragraph
              key={eachData}
              classNames="short-text scope-definition mt-0"
              text={eachData}
            />))}
          {content.privacyScope &&
          <PrivacyScope
            classNames="text-custom-dark scope-text text-bold"
            text={content.privacyScope}
          />
          }
          {content.scope &&
          <Paragraph
            classNames="short-text scope-definition mt-0"
            text={content.scope}
          />}
          <Content data={content} />
        </Container>
        <section className="mt-5">
          <Footer />
        </section>
      </Fragment>}
    </Suspense>
  );
};
export default Statement;

Statement.defaultProps = {
  activePage: ''
};

Statement.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ])
  ).isRequired,
  activePage: PropTypes.string,
};
