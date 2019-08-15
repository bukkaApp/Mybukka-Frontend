import React, { Fragment, useContext } from 'react';
// import PropTypes from 'prop-types';
import MyContextPush from 'Redux/MyContextPush';
import Twitter, { Facebook } from 'Components/button/SocialSvg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../../components/button/Button';
import './InviteFriends.css';

const Footer = ({ inputData, handleCopy }) => {
  const props = useContext(MyContextPush);
  return (
    <section>
      <div className="d-flex flex-column">
        <div className="invite-link invite-padding d-flex justify-content-around align-items-center mx-4">
          <CopyToClipboard text={inputData.link} onCopy={() => handleCopy()}>
            <Fragment>
              <span>{inputData.link}</span>
              <span
                className={inputData.copied ? 'text-success' : 'text-warning'}
              >
              COPY
              </span>
            </Fragment>
          </CopyToClipboard>
        </div>
        <div className="social invite-padding d-flex flex-row justify-content-end mx-4">
          <button
            className="facebook-btn mb-4 w-50 mr-4 d-flex justify-content-around"
            type="button"
            onClick={(e) => { console.log(' jdjdjdj ddkfjjfkjdkdf'); }}
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

// InviteFriends.propTypes = {
//   push: PropTypes.func.isRequired
// };
