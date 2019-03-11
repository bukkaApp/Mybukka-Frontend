import React, { Fragment, useEffect } from 'react';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';
import request from 'superagent';
import axios from 'axios';
import { connect } from 'react-redux';
import Column from 'Components/grid/Column';
import verifyToken from 'Utils/verifyToken';
import ProfileHeader from './ProfileHeader';
import ProfileImageSection from './ProfileImageSection';
import AccountDetails from './AccountDetails';
import postUserData from '../actionCreators/postUserData';
import fetchUserData from '../actionCreators/fetchUserData';

import './profileScene.scss';

const ProfileScene = ({
  requestUserData,
  user,
  status,
  finishedRequest,
  loading,
  editUserData,
  userAddress
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
      }
    }
  });

  const appendCloudinaryDetails = (fileUrl) => {
    const formData = new FormData();
    formData.append('api_key', process.env.API_KEY);
    formData.append('api_secret', process.env.API_SECRET);
    formData.append('file', fileUrl);
    formData.append('cloud_name', process.env.CLOUD_NAME);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    return formData;
  };

  const storeOnCloudinary = formData =>
    axios.post(process.env.CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Allow-Control-Allow-Origin': '*'
      }
    });

  const handleImageUpload = (file) => {
    const token = localStorage.getItem('x-access-token');
    const { slug } = verifyToken(token);
    const formData = appendCloudinaryDetails(file);
    storeOnCloudinary(formData).then((response) => {
      const data = {
        ...userData,
        imageUrl: response.body.secure_url
      };
      return editUserData(`/user/${slug}`, data);
    });
  };

  const uploadImageToCloudinary = (file) => {
    const upload = request
      .post(process.env.CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
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
  profileReducer: { userInfo: user, address: userAddress, finishedRequest }
}) => ({
  loading,
  status,
  user,
  userAddress,
  finishedRequest
});

export default connect(mapStateToProps,
  { requestUserData: fetchUserData,
    editUserData: postUserData }
)(ProfileScene);

ProfileScene.defaultProps = {
  loading: false,
  userAddress: {}
};

ProfileScene.propTypes = {
  loading: PropTypes.bool,
  requestUserData: PropTypes.func.isRequired,
  finishedRequest: PropTypes.bool.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  editUserData: PropTypes.func.isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.string),
      PropTypes.string
    ])
  ).isRequired,
  userAddress: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.string),
      PropTypes.string
    ])
  )
};
