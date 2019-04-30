import React, { Fragment, useEffect } from 'react';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Column from 'Components/grid/Column';
import InternalError from 'Components/not-found/InternalError';
import signout from 'Components/navbar/actionCreators/signOut';
import AuthenticaticatedNavbar from 'Components/navbar/AuthenticaticatedNavbar';
import ProfileHeader from './ProfileHeader';
import ProfileImageSection from './ProfileImageSection';
import AccountDetails from './AccountDetails';
import postUserData from '../actionCreators/sendUserData';
import fetchUserData from '../actionCreators/fetchUserData';
import deleteAddress from '../actionCreators/deleteAddress';
import fetchUserAddress from '../actionCreators/fetchUserAddress';
import uploadProfilePicture from '../actionCreators/uploadProfilePicture';
import tokenVerification from '../../../utils/verifyToken';

import './profileScene.scss';

const ProfileScene = ({
  history,
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
  signOut,
}) => {
  const { push } = history;
  const { userInfo } = user;
  const userData = userInfo;
  const { authenticated } = status;

  useEffect(() => {
    if (!localStorage.getItem('x-access-token')) {
      signOut();
    }
  });

  useEffect(() => {
    if (!authenticated) {
      push('/login?next=/profile');
    }
    if (tokenVerification() && authenticated && !finishedRequest) {
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

  if (!authenticated) {
    return (<InternalError history={history} />);
  }

  return (
    <Fragment>
      <AuthenticaticatedNavbar />
      {userData ? (
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
              </Column>
            </Row>
          </Container>
        </Fragment>
      ) : (
        <div />
      )}
    </Fragment>
  );
};

const mapStateToProps = ({
  loadingReducer: { status: loading },
  authenticationReducer: { status },
  fetchUserData: { userInfo: user, finishedRequest },
  fetchUserAddress: { address: userAddress },
  postUserData: { errorMessage }
}) => ({
  loading,
  status,
  user,
  errorMessage,
  userAddress: userAddress.userAddresses,
  finishedRequest
});

export default connect(
  mapStateToProps,
  {
    requestUserData: fetchUserData,
    editUserData: postUserData,
    requestUserAddress: fetchUserAddress,
    deleteUserAddress: deleteAddress,
    addProfilePicture: uploadProfilePicture,
    signOut: signout
  }
)(ProfileScene);

ProfileScene.defaultProps = {
  loading: false,
  userAddress: {},
  errorMessage: ''
};


const proptypes = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.string
      ])
    ),
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ])
);

ProfileScene.propTypes = {
  signOut: PropTypes.func.isRequired,
  addProfilePicture: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  requestUserData: PropTypes.func.isRequired,
  requestUserAddress: PropTypes.func.isRequired,
  deleteUserAddress: PropTypes.func.isRequired,
  finishedRequest: PropTypes.bool.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  editUserData: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.number
    ]))
  ])).isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.string),
      PropTypes.string
    ])
  ).isRequired,
  userAddress: PropTypes.oneOfType([
    PropTypes.arrayOf(proptypes),
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.arrayOf(proptypes)
      ])
    )
  ])
};
