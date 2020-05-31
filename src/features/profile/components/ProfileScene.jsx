import React, { Fragment, useEffect, useState } from 'react';

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
import { useModalContext } from '../../../context/ModalContext';
import { useUserContext } from '../../../context/UserContext';
import { useLoadingContext } from '../../../context/LoadingContext';
import { useToastContext } from '../../../context/ToastContext';
import useHashLinkUpdate from '../../../hooks/useHashLinkUpdate';

import './profileScene.scss';

const ProfileScene = ({
  addProfilePicture,
}) => {
  const { user, payment, setAddress, setCard, setProfile } = useUserContext();
  const { loading } = useLoadingContext();
  const { setPaymentSecurityPopup, setPaymentPendingPopup, setPaymentGatewayPopup, setModal } = useModalContext();
  const [state, setState] = useState({ firstName: '', lastName: '', email: '', imageUrl: '', verified: false });
  const { setToast } = useToastContext();
  const { API } = useApi();

  useHashLinkUpdate();

  const tryCatch = async (apiCall, successHandler, showError, errorHandler) => {
    try {
      const response = await apiCall();
      if (successHandler) successHandler(response.data);
    } catch (error) {
      if (errorHandler) errorHandler(null);
      if (showError && error.response && error.response.status === 404) setToast({ message: error.response.data.message, type: 'error' });
      loading('USER', false);
    }
  };

  const handlePaymentContinuation = () => {
    setModal(true);
    const status = (payment && payment.status) || '';
    const activeStatus = status.split('send_').join('');
    if (activeStatus === 'pending') {
      return setPaymentPendingPopup(true);
    } else if (activeStatus === 'url') {
      return setPaymentGatewayPopup(true);
    } else if (payment && activeStatus !== 'failed' && status !== '') {
      setPaymentSecurityPopup(true);
    }
  };

  useEffect(() => {
    if (payment && payment.status !== '') handlePaymentContinuation();
  }, [payment]);

  useEffect(() => {
    setState({ ...state, ...user });
  }, [user]);

  useEffect(() => {
    const getUser = () => tryCatch(API.profile.get, res => setProfile(res.userInfo));
    const getAddress = () => tryCatch(API.address.get, res => setAddress(res.foundAddress), true, setAddress);
    const getPaymentCard = () => tryCatch(API.card.get, res => setCard(res.foundCard), true, setCard);
    loading('USER', true);
    getUser();
    getAddress();
    getPaymentCard();
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
        firstName={state.firstName || ''}
        lastName={state.lastName || ''}
      />
      <Container classNames="account-profile-details">
        <Row>
          <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-2 profile-img-column">
            <ProfileImageSection
              firstName={state.firstName || ''}
              lastName={state.lastName || ''}
              handleChange={uploadImageToCloudinary}
              imageUrl={state.imageUrl || undefined}
            />
          </Column>
          <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10 profile-details-column">
            <AccountDetails
              setProfile={setProfile}
              userInfo={state}
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
