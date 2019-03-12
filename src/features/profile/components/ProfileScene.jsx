import React, { Fragment, useEffect } from 'react';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';
import request from 'superagent';
import { connect } from 'react-redux';
import Column from 'Components/grid/Column';
import AuthenticaticatedNavbar from 'Components/navbar/AuthenticaticatedNavbar';
import verifyToken from 'Utils/verifyToken';
import ProfileHeader from './ProfileHeader';
import ProfileImageSection from './ProfileImageSection';
import AccountDetails from './AccountDetails';
import postUserData from '../actionCreators/postUserData';
import fetchUserData from '../actionCreators/fetchUserData';
import fetchUserAddress from '../actionCreators/fetchUserAddress';

import './profileScene.scss';

const ProfileScene = ({
  requestUserData,
  user,
  status,
  finishedRequest,
  loading,
  editUserData,
  userAddress,
  requestUserAddress,
}) => {
  const { userInfo, updatedUser } = user;
  const userData = userInfo || updatedUser;
  const { authenticated } = status;
  useEffect(() => {
    if (authenticated) {
      if (!finishedRequest) {
        const token = localStorage.getItem('x-access-token');
        const { slug } = verifyToken(token);
        requestUserData(`/user/${slug}`);
        requestUserAddress(`/${slug}/address`);
      }
    }
  });

  const uploadImageToCloudinary = (event) => {
    const file = event.target.files[0];
    const upload = request
      .post(process.env.CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (!err) {
        const token = localStorage.getItem('x-access-token');
        const { slug } = verifyToken(token);
        const data = {
          ...userData,
          imageUrl: response.body.secure_url
        };
        return editUserData(`/user/${slug}`, data);
      }
    });
  };

  return authenticated && finishedRequest ? (
    <Fragment>
      <AuthenticaticatedNavbar />
      <ProfileHeader
        firstName={userData.firstName}
        lastName={userData.lastName}
      />
      <Container classNames="account-profile-details">
        <Row>
          <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-2 profile-img-column">
            <ProfileImageSection
              firstName={userData.firstName}
              lastName={userData.lastName}
              handleChange={uploadImageToCloudinary}
              imageUrl={userData.imageUrl}
            />
          </Column>
          <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10 profile-details-column">
            <AccountDetails
              editUserData={editUserData}
              userInfo={userData}
              loading={loading}
              userAddress={userAddress}
            />
          </Column>
        </Row>
      </Container>
    </Fragment>
  ) : null;
};

const mapStateToProps = ({
  loadingReducer: { status: loading },
  authenticationReducer: { status },
  fetchUserData: { userInfo: user, finishedRequest },
  fetchUserAddress: { address: userAddress, }
}) => ({
  loading,
  status,
  user,
  userAddress: userAddress.userAddresses,
  finishedRequest
});

export default connect(mapStateToProps,
  { requestUserData: fetchUserData,
    editUserData: postUserData,
    requestUserAddress: fetchUserAddress
  }
)(ProfileScene);

ProfileScene.defaultProps = {
  loading: false,
  userAddress: {}
};

ProfileScene.propTypes = {
  loading: PropTypes.bool,
  requestUserData: PropTypes.func.isRequired,
  requestUserAddress: PropTypes.func.isRequired,
  finishedRequest: PropTypes.bool.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  editUserData: PropTypes.func.isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.string),
      PropTypes.string
    ])
  ).isRequired,
  userAddress: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
          ])),
        PropTypes.string,
        PropTypes.bool
      ])),
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ])),
    PropTypes.string,
    PropTypes.bool
  ])
};
