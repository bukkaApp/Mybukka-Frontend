import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import DismissModal from 'Components/modal/DismissModal';
import Modal from 'Components/modal/Modal';
import MyContextPush from 'Redux/MyContextPush';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    <Modal dataTarget="inviteFrnd" classNames="inviteFrnd">
      <DismissModal classNames="close" />
      <Invite handleCopy={copyInviteLink} handleChange={handleChange} inputField={inputData} />
    </Modal>
  );
};

export default InviteFriends;

// InviteFriends.propTypes = {
//   push: PropTypes.func.isRequired
// };
