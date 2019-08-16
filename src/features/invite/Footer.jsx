import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Twitter, { Facebook } from 'Components/button/SocialSvg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MyContextPush from './context-api/MyContextPush';
import Button from '../../components/button/Button';
import './InviteFriends.css';

const Footer = ({ inputData, handleCopy }) => {
  const props = useContext(MyContextPush);
  return (
    <section>
      <div className="d-flex flex-column">
        <div className="mx-4">
          <CopyToClipboard text={inputData.link} onCopy={() => handleCopy()}>
            <div className="cursor-pointer invite-link invite-padding
            d-flex justify-content-around align-items-center"
            >
              {inputData.link}
              <span
                className={inputData.copied ?
                  'text-success' : 'text-warning'}
              >{inputData.copied ? 'COPIED' : 'COPY' }</span>
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
            onClick={() => props.push('/social/facebook')}
          >
            <Facebook />
            <span className="text-white">SHARE</span>
          </button>
          <Button
            classNames="twitter-btn mb-4 w-50 mr-4 d-flex justify-content-around"
            type="button"
            handleClick={() => props.push('/social/twitter')}
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
  push: PropTypes.func.isRequired,
};
