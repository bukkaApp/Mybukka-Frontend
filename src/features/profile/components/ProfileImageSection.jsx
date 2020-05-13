import React from 'react';
import PropTypes from 'prop-types';

import Container from 'Components/container';
import Button from 'Components/button/Button';
import Field from 'Components/input/Field';

import ProfileHeaderTitle from '../common/ProfileHeaderTitle';

import './profileImageSection.scss';

const ProfileImage = ({ imageUrl, firstName, lastName }) => (
  <div className="profile-image-div text-center">
    <img src={imageUrl} style={{ margin: 'auto' }} className="img-fluid profile-photo" alt="" />
    <div className="d-lg-none profile-header-small">
      <ProfileHeaderTitle firstName={firstName} lastName={lastName} />
    </div>
  </div>
);

const UploadImageSection = ({ handleChange }) => (
  <div className="upload-image-button-section d-flex justify-content-center">
    <Button classNames="button-upload" type="button" handleClick={() => {}}>
      <span className="button-text">
        Change Photo
        <Field.Input
          type="file"
          classNames="select-photo"
          name="selectFile"
          accept="image/*"
          handleChange={handleChange}
        />
      </span>
    </Button>
  </div>
);

const ProfileImageSection = props => (
  <Container classNames="profile-image-section">
    <ProfileImage {...props} />
    <UploadImageSection {...props} />
  </Container>
);

export default ProfileImageSection;

UploadImageSection.defaultProps = {
  handleChange: () => {},
};

UploadImageSection.propTypes = {
  handleChange: PropTypes.func,
};

ProfileImage.defaultProps = {
  imageUrl:
    'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550329338/download_tp7v0d.png' // eslint-disable-line
};

ProfileImage.propTypes = {
  imageUrl: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};
