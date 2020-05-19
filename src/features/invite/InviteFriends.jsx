import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DismissModal from 'Components/modal/DismissModal';
import Modal from 'Components/modal/Modal';
// import MyContextPush from './context-api/MyContextPush';
import './InviteFriends.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const Invite = ({ handleCopy, inputField, handleChange }) => (
  <div className="invite-padding m-4">
    <Header />
    <Content handleChange={handleChange} inputData={inputField} />
    <Footer inputData={inputField} handleCopy={handleCopy} />
  </div>
);

const InviteFriends = () => {
  const [inputData, setInputData] = useState({
    emails: '',
    copied: false,
    link: 'https://bitly.com',
  });

  const handleChange = (event) => {
    setInputData({
      ...inputData,
      copied: false,
      [event.target.name]: event.target.value,
    });
  };

  const copyInviteLink = () => {
    setInputData({
      ...inputData,
      copied: true,
    });
  };

  return (
    <Modal classNames="inviteFrnd">
      <DismissModal classNames="close" />
      <Invite handleCopy={copyInviteLink} handleChange={handleChange} inputField={inputData} />
    </Modal>
  );
};

export default InviteFriends;

Invite.propTypes = {
  inputField: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ])).isRequired,
  handleCopy: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
