import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Twitter, { Facebook } from 'Components/button/SocialSvg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../button/Button';
import { useModalContext } from '../../context/ModalContext';

const Footer = ({ inputData, handleCopy }) => {
  const { push } = useHistory();
  const { setInvitePopup, setModal } = useModalContext();

  const handleClick = (toLocation) => {
    setInvitePopup(false);
    setModal(false);
    push(toLocation);
  };

  return (
    <section className="Invite-Footer">
      <div className="d-flex flex-column">
        <div className="mx-4">
          <CopyToClipboard text={inputData.link} onCopy={() => handleCopy()}>
            <div className="cursor-pointer invite-link invite-padding
            d-flex justify-content-around align-items-center"
            >
              {inputData.link}
              <span className={(inputData.copied && 'text-success') || 'text-warning'}>
                {inputData.copied ? 'COPIED' : 'COPY' }
              </span>
            </div>
          </CopyToClipboard>
        </div>
        <div className="social invite-padding
        d-flex flex-row justify-content-end mx-4"
        >
          <button
            className="facebook-btn mb-4 w-50
            mr-4 d-flex justify-content-around"
            type="button"
            onClick={() => handleClick('/social/facebook')}
          >
            <Facebook />
            <span className="text-white">SHARE</span>
          </button>
          <Button
            classNames="twitter-btn mb-4 w-50
            mr-4 d-flex justify-content-around"
            type="button"
            handleClick={() => handleClick('/social/twitter')}
          >
            <Twitter />
            <span className="text-white">SHARE</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Footer;

Footer.propTypes = {
  inputData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ])).isRequired,
  handleCopy: PropTypes.func.isRequired,
};
