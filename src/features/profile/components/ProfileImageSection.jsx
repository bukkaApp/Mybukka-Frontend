import React from 'react';
import PropTypes from 'prop-types';

import Container from 'Components/container';
import Button from 'Components/button/Button';
import InputField from 'Components/input/InputField';

import ProfileHeaderTitle from '../common/ProfileHeaderTitle';

import './profileImageSection.scss';

const ProfileImage = ({ imageUrl }) => (
  <div className="profile-image-div text-center">
    <img src={imageUrl} className="img-fluid profile-photo" alt="" />
    <div className="d-lg-none profile-header-small">
      <ProfileHeaderTitle firstName="Efosa" lastName="Okpugie" />
    </div>
  </div>
);

const UploadImageSection = () => (
  <div className="upload-image-button-section d-flex justify-content-center">
    <Button classNames="button-upload" type="button" handleClick={() => {}}>
      <span className="button-text">
        Change Photo
        <InputField
          type="file"
          classNames="select-photo"
          name="selectFile"
          handleChange={() => {}}
        />
      </span>
    </Button>
  </div>
);

const ProfileImageSection = () => (
  <Container classNames="profile-image-section">
    <ProfileImage />
    <UploadImageSection />
  </Container>
);

export default ProfileImageSection;

ProfileImage.defaultProps = {
  imageUrl:
    'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png' // eslint-disable-line
};

ProfileImage.propTypes = {
  imageUrl: PropTypes.string
};
