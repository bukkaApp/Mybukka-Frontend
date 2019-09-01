import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DismissModal from 'Components/modal/DismissModal';
import Modal from 'Components/modal/Modal';
import PushContext from './context-api/PushContext';
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

const InviteFriends = ({ push }) => {
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
    <PushContext.Provider value={{ push }}>
      <Modal dataTarget="inviteFrnd" classNames="inviteFrnd">
        <DismissModal classNames="close" />
        <Invite handleCopy={copyInviteLink} handleChange={handleChange} inputField={inputData} />
      </Modal>
    </PushContext.Provider>
  );
};

export default InviteFriends;


InviteFriends.propTypes = {
  push: PropTypes.func.isRequired,
};

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
