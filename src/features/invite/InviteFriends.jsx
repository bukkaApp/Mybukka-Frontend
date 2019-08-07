import React, { useState, Fragment } from 'react';
import Modal from 'Components/modal';
import InputField from 'Components/input/InputField';
import Button from 'Components/button/Button';
import Twitter, { Facebook } from 'Components/button/SocialSvg';
import DismissModal from 'Components/modal/DismissModal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './InviteFriends.css';

export default function InviteFriends() {
  const [form, setForm] = useState({
    emails: '',
    copied: false,
    link: 'https://bitly.com',
  });

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const copyLinkInvite = () => {
    setForm({
      ...form,
      copied: true,
    });
  };

  return (
    <Modal>
      <DismissModal classNames="close" />
      <div className="invite-padding m-4">
        <section id="header">
          <figure className="figure">
            <img
              src="https://raster-static.postmates.com?url=https://buyer-static.postmates.com/dist/prod/web-referral-card@3x.c76dc79be5f0769e45a6f94db61b200b53ce3c70eea546fc2c08aba75640b50300402b98fd3f1a6bb6668fc427cc2d05163512756e34b909cb00a595ee2ca964.png&quality=85&w=0&h=0&mode=auto&format=webp&v=4"
              className="figure-img img-fluid rounded"
              alt="invite-friends-fig"
            />
          </figure>
        </section>
        <section id="main">
          <div className="coupon-header text-center text-dark">
            <h3>Get N1000 off all your purchases</h3>
          </div>
          <div className="content text-center">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              praesentium nam fuga fugiat quos quasi consequatur voluptatum
              possimus inventore? Cumque.
            </p>
          </div>
          <div className="recipient-form">
            <form>
              <InputField
                type="text"
                name="emails"
                placeholderText="Enter email address(es) separated by commas"
                classNames="text-field form-control p-2"
                handleFocus={() => setFocus(true)}
                handleChange={handleChange}
                value={form.emails}
              />
              <button>
                <span>SEND</span>
              </button>
            </form>
          </div>
          <hr />
        </section>
        <section id="footer">
          <div className="d-flex flex-column">
            <div className="invite-link invite-padding d-flex justify-content-around align-items-center mx-4">
              <CopyToClipboard text={form.link} onCopy={() => copyLinkInvite()}>
                <Fragment>
                  <span>{form.link}</span>
                  <span
                    className={form.copied ? 'text-success' : 'text-warning'}
                  >
                    COPY
                  </span>
                </Fragment>
              </CopyToClipboard>
            </div>
            <div className="social invite-padding d-flex flex-row justify-content-end mx-4">
              <Button
                classNames="facebook-btn mb-4 w-50 mr-4 d-flex justify-content-around"
                type="button"
                disabled={false}
                handleClick={() => push('/social/facebook')}
              >
                <Facebook />
                <span className="text-white">SHARE</span>
              </Button>
              <Button
                classNames="twitter-btn mb-4 w-50 mr-4 d-flex justify-content-around"
                type="button"
                disabled={false}
                handleClick={() => push('/social/twitter')}
              >
                <Twitter />
                <span className="text-white">SHARE</span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
}
