import React, { Fragment, useEffect } from 'react';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Credict from 'Components/credict';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Column from 'Components/grid/Column';
import AuthenticaticatedNavbar from 'Components/navbar/AuthenticaticatedNavbar';
import ProfileHeader from './ProfileHeader';
import ProfileImageSection from './ProfileImageSection';
import AccountDetails from './AccountDetails';
import uploadProfilePicture from '../actionCreators/uploadProfilePicture';
import useApi from '../../../shared/api';
import { useUserContext } from '../../../context/UserContext';
import { useLoadingContext } from '../../../context/LoadingContext';
import { useToastContext } from '../../../context/ToastContext';

import './profileScene.scss';


const defaultData = { firstName: '', lastName: '', email: '' };

const ProfileScene = ({
  addProfilePicture,
}) => {
  const { user, setAddress, setProfile } = useUserContext();
  const { loading } = useLoadingContext();
  const { setToast } = useToastContext();
  const { API } = useApi();

  const tryCatch = async (apiCall, cb, showError) => {
    try {
      const response = await apiCall();
      if (cb) cb(response.data);
    } catch (error) {
      if (showError && error.response && error.response.status === 404) setToast({ message: error.response.data.message, type: 'error' });
      loading('USER', false);
    }
  };

  useEffect(() => {
    const getUser = async () => tryCatch(API.profile.get, res => setProfile(res.userInfo));
    const getAddress = async () => tryCatch(API.address.get, res => setAddress(res.addresses), true);
    loading('USER', true);
    getUser();
    getAddress();
    loading('USER', false);
  }, []);

  const uploadImageToCloudinary = (event) => {
    const file = event.target.files[0];
    addProfilePicture(file, (data) => {
      tryCatch(() => API.profile.patch(null, data), res => setProfile(res.updatedUser));
    });
  };

  return (
    <Fragment>
      <AuthenticaticatedNavbar />
      <ProfileHeader
        firstName={user.firstName || ''}
        lastName={user.lastName || ''}
      />
      <Container classNames="account-profile-details">
        <Row>
          <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-2 profile-img-column">
            <ProfileImageSection
              firstName={user.firstName || ''}
              lastName={user.lastName || ''}
              handleChange={uploadImageToCloudinary}
              imageUrl={user.imageUrl || undefined}
            />
          </Column>
          <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10 profile-details-column">
            <AccountDetails
              setProfile={setProfile}
              userInfo={user || defaultData}
              loading={loading}
            />
            <Credict />
          </Column>
        </Row>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    addProfilePicture: uploadProfilePicture,
  },
)(ProfileScene);

ProfileScene.defaultProps = {
  loading: false,
  userAddress: {},
  errorMessage: '',
};

ProfileScene.propTypes = {
  addProfilePicture: PropTypes.func.isRequired,
};
