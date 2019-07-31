import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PrimaryNavbar from 'Components/navbar';
import Container from 'Components/container';
import Footer from 'Components/footer/Footer';
import UnselectableHeading from '../common/UnSelectableHeading';
import LastUpdated from '../common/LastUpdated';
import Foreword from '../common/Forewords';
import PrivacyScope from '../common/Scope';
import Paragraph from '../common/Paragraph';
import Content from './Content';
import SeceondaryNavbar from '../common/SecondaryNavbar';

const Statement = ({ data }) => (
  <Fragment>
    <section className="border-bottom">
      <PrimaryNavbar authButton />
    </section>
    <SeceondaryNavbar />
    <Container classNames="custom-container">
      <UnselectableHeading
        font="font-size96"
        classNames="my-5 pb-5 px-0 mx-0"
        text={data.title}
      />
      <LastUpdated classNames="mx-0" text={data.lastUpdated} />
      <Foreword
        classNames="short-text text-custom-dark forewords"
      >
        {data.bold ? <strong className="font-18x">{data.forewords}</strong>
          : data.forewords}{' '}
        {data.forewordConclusion || ''}
      </Foreword>
      {data.further && data.further.map(eachData =>
        (<Paragraph
          classNames="short-text scope-definition mt-0"
          text={eachData}
        />))}
      {data.privacyScope &&
      <PrivacyScope
        classNames="text-custom-dark scope-text text-bold"
        text={data.privacyScope}
      />
      }
      {data.scope &&
      <Paragraph
        classNames="short-text scope-definition mt-0"
        text={data.scope}
      />}
      <Content data={data} />
    </Container>
    <section className="mt-5">
      <Footer />
    </section>
  </Fragment>
);

export default Statement;

Statement.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired
};
