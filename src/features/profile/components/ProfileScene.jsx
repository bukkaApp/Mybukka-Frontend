import React, { Fragment } from 'react';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';
import ProfileHeader from './ProfileHeader';
import ProfileImageSection from './ProfileImageSection';
import AccountDetails from './AccountDetails';

import './profileScene.scss';

const ProfileScene = () => (
  <Fragment>
    <ProfileHeader firstName="Efosa" lastName="Okpugie" />
    <Container classNames="account-profile-details">
      <Row>
        <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-2 profile-img-column">
          <ProfileImageSection />
        </Column>
        <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10 profile-details-column">
          <AccountDetails />
        </Column>
      </Row>
    </Container>
  </Fragment>
);

export default ProfileScene;
