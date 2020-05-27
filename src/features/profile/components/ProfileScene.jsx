import React, { Fragment, useEffect } from 'react';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Credict from 'Components/credict';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Column from 'Components/grid/Column';
import signout from 'Components/navbar/actionCreators/logOut';
import AuthenticaticatedNavbar from 'Components/navbar/AuthenticaticatedNavbar';
import ProfileHeader from './ProfileHeader';
import ProfileImageSection from './ProfileImageSection';
import AccountDetails from './AccountDetails';
import postUserData from '../actionCreators/sendUserData';
import fetchUserData from '../actionCreators/fetchUserData';
import deleteAddress from '../actionCreators/deleteAddress';
import fetchUserAddress from '../actionCreators/fetchUserAddress';
import uploadProfilePicture from '../actionCreators/uploadProfilePicture';
import useApi from '../../../shared/api';
import { useUserContext } from '../../../context/UserContext';

import './profileScene.scss';

const defaultData = { firstName: '', lastName: '', email: '' };

const ProfileScene = ({
  requestUserData,
  deleteUserAddress,
  requestUserAddress,
  addProfilePicture,
  user,
  status,
  errorMessage,
  finishedRequest,
  loading,
  editUserData,
  userAddress,
}) => {
  const { API } = useApi();
  const { isAuthenticated } = useUserContext();
  const { userInfo } = user;
  const userData = userInfo || defaultData;
  const { authenticated } = status;

  useEffect(() => {
<<<<<<< Updated upstream
    if (!localStorage.getItem('x-access-token')) {
      signOut();
    }
  });

  useEffect(() => {
    if (!authenticated) {
      push('/login?next=/profile');
    }
    if (AuthService.isAuthenticated() && authenticated && !finishedRequest) {
=======
    if (isAuthenticated && !finishedRequest) {
>>>>>>> Stashed changes
      requestUserData('/user/profile');
      requestUserAddress('/user/address');
    }
  });

  const uploadImageToCloudinary = (event) => {
    const file = event.target.files[0];
    addProfilePicture(file, userData, async (data) => {
      await editUserData('/user/profile', data);
      await requestUserData('/user/profile');
    });
  };

  return (
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
              imageUrl={userData.imageUrl || undefined}
            />
          </Column>
          <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10 profile-details-column">
            <AccountDetails
              errorMessage={errorMessage}
              editUserData={editUserData}
              requestUserData={requestUserData}
              deleteUserAddress={deleteUserAddress}
              requestUserAddress={requestUserAddress}
              userInfo={userData}
              loading={loading}
              userAddress={userAddress}
            />
            <Credict />
          </Column>
        </Row>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = ({
  loadingReducer: { status: loading },
  authenticationReducer: { status },
  userProfileReducer: { userInfo: user, finishedRequest },
  userAddressReducer: { address: userAddress },
  updateUserProfileReducer: { errorMessage },
}) => ({
  loading,
  status,
  user,
  errorMessage,
  userAddress: userAddress.userAddresses,
  finishedRequest,
});

export default connect(
  mapStateToProps,
  {
    requestUserData: fetchUserData,
    editUserData: postUserData,
    requestUserAddress: fetchUserAddress,
    deleteUserAddress: deleteAddress,
    addProfilePicture: uploadProfilePicture,
    signOut: signout,
  },
)(ProfileScene);

ProfileScene.defaultProps = {
  loading: false,
  userAddress: {},
  errorMessage: '',
};

ProfileScene.propTypes = {
  addProfilePicture: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  requestUserData: PropTypes.func.isRequired,
  requestUserAddress: PropTypes.func.isRequired,
  deleteUserAddress: PropTypes.func.isRequired,
  finishedRequest: PropTypes.bool.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  editUserData: PropTypes.func.isRequired,
};
